import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController} from '@ionic/angular';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit, AfterViewInit {
    size = 200;
    map: any;
    alreadyIcon = false;
    choosing = true;
    notChoosing = !this.choosing;
    currentFunctionClick;
    myPoints = [];
    currentLat = 0;
    currentLon = 0;
    currentColor = '';
  constructor(private http: HttpClient, private alertCtr: AlertController) {
  }
  ngOnInit() {
  }
  async ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken'
    ).set('pk.eyJ1IjoicGFibG9hcmVsbGFubyIsImEiOiJjanhjN2JzZ20wMGdlNDFxeDFlcjRpb3IwIn0.T9fCWehIFtPt64Izknxn7g');
    this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/outdoors-v11',
          attributionControl: false,
    });
    this.map.on('render', () => {
          this.map.resize();
    });
  }

    addGroup() {
    this.choosing = false;
    this.notChoosing = true;
    this.currentFunctionClick = this.handleAddGroup.bind(this);
    this.map.on('click', this.currentFunctionClick);
  }
  handleAddGroup(e) {
    const self = this;
    if (this.alreadyIcon) {
          this.map.removeLayer('points');
          this.map.removeSource('points');
          this.map.removeImage('pulsing-dot');
      } else {
          this.alreadyIcon = true;
      }
    const pulsingDot = {
          width: this.size,
          self: this,
          map: this.map,
          height: this.size,
          size: this.size,
          data: new Uint8Array(this.size * this.size * 4),
          onAdd() {
              const canvas = document.createElement('canvas');
              canvas.width = this.width;
              canvas.height = this.height;
              this.context = canvas.getContext('2d');
          },

          render() {
              const duration = 1000;
              const t = (performance.now() % duration) / duration;

              const radius = self.size / 2 * 0.3;
              const outerRadius = self.size / 2 * 0.7 * t + radius;
              const context = this.context;

// draw outer circle
              context.clearRect(0, 0, this.width, this.height);
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
              context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
              context.fill();

// draw inner circle
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
              context.fillStyle = 'rgba(255, 100, 100, 1)';
              context.strokeStyle = 'white';
              context.lineWidth = 2 + 4 * (1 - t);
              context.fill();
              context.stroke();

// update this image's data with data from the canvas
              this.data = context.getImageData(0, 0, this.width, this.height).data;

// keep the map repainting
              self.map.triggerRepaint();

// return `true` to let the map know that the image was updated
              return true;
          }
      };
    this.currentLat = e.lngLat.lat;
    this.currentLon = e.lngLat.lng;
    self.map.addImage('pulsing-dot', pulsingDot, {pixelRatio: 4});
    self.map.addLayer({
          id: 'points',
          type: 'symbol',
          source: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [{
                      type: 'Feature',
                      geometry: {
                          type: 'Point',
                          coordinates: [e.lngLat.lng, e.lngLat.lat],
                      }
                  }]
              }
          },
          layout: {
              'icon-image': 'pulsing-dot'
          }
      });
  }

  closeAddGroup() {
    if (this.alreadyIcon) {
      this.map.removeLayer('points');
      this.map.removeSource('points');
      this.map.removeImage('pulsing-dot');
    } else {
      //
    }
    this.alreadyIcon = false;
    this.choosing = true;
    this.notChoosing = false;
    this.map.off('click', this.currentFunctionClick);
  }

  async saveGroup() {
    const alert = await this.alertCtr.create({
          header: 'Confirm',
          inputs: [
              {
                  name: 'GroupName',
                  type: 'text',
                  placeholder: 'Group Name. ex. Paris Trip, Friends and Family, etc.'
              }
          ],
          buttons: [
              {
                  text: 'Cancel',
                  role: 'cancel',
                  cssClass: 'secondary',
                  handler: () => {
                      console.log('Confirm Cancel');
                  }
              }, {
                  text: 'Create',
                  handler: this.finalizeGroup.bind(this)
              }
          ]
    });
    await alert.present();
  }
  async finalizeGroup(data) {
    const headersSend = new HttpHeaders();
    headersSend.append('Access-Control-Allow-Origin', '*');
    headersSend.append('Access-Control-Allow-Credentials', 'true');
    headersSend.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    headersSend.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, ' +
          'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    const response = await this.http.post('http://127.0.0.1:8000/api/make-room',
            {lat: this.currentLat, lon: this.currentLon, color: 'rgba(255, 100, 100, 1)', name: data.GroupName},
        {headers: headersSend});
    response.subscribe(async (res: any) => {
            console.log(res);
    });
  }


}
