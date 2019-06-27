import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AlertController, NavController} from '@ionic/angular';
@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})

export class MainPage implements OnInit, AfterViewInit {
    size = 200;
    template = '<ion-button> </ion-button>';
    map: any;
    alreadyIcon = false;
    choosing = true;
    notChoosing = !this.choosing;
    currentFunctionClick;
    currentLat = 0;
    currentLon = 0;
    currentColor = '';
    colors = ['rgba(255, 100, 100, 1)', 'rgba(0, 173, 252)', 'rgba(0, 179, 146)', 'rgba(143, 138, 255)',
        'rgba(126, 165, 31)'];
  constructor(private http: HttpClient, private alertCtr: AlertController, private nav: NavController) {
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken'
    ).set('pk.eyJ1IjoicGFibG9hcmVsbGFubyIsImEiOiJjanhjN2JzZ20wMGdlNDFxeDFlcjRpb3IwIn0.T9fCWehIFtPt64Izknxn7g');
    this.map = new mapboxgl.Map({
          container: 'map',
          style: 'mapbox://styles/mapbox/outdoors-v11',
          attributionControl: false,
    });
    this.map.on('style.load', () => {
      this.addExistingPoints();
    });
    this.map.on('render', () => {
          this.map.resize();
    });
  }

  async addExistingPoints() {
    console.log('made points');
    const headersSend = new HttpHeaders();
    headersSend.append('Access-Control-Allow-Origin', '*');
    headersSend.append('Access-Control-Allow-Credentials', 'true');
    headersSend.append('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT');
    headersSend.append('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, ' +
          'Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    const response = await this.http.get('http://127.0.0.1:8000/api/get-rooms',
          {headers: headersSend});
    response.subscribe(async (res: any) => {
      for (const group of res) {
        this.makePoint(group.name, group.lat, group.lon, group.color, group.id);
        this.currentColor = group.color;
      }
      console.log(this.currentColor);
      const index = ((this.colors.indexOf(this.currentColor) + 1) % 4);
      console.log(index);
      this.currentColor = this.colors[index];
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
          currentColor: this.currentColor,
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
              context.fillStyle = 'rgba(255, 255, 255, 0.2)';
              context.fill();

// draw inner circle
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
              context.fillStyle = this.currentColor;
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

  makePoint(name, lat, lng, color, roomID) {
    const self = this;
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
              const duration = 1800;
              const t = (performance.now() % duration) / duration;

              const radius = self.size / 2 * 0.3;
              const outerRadius = self.size / 2 * 0.4 * t + radius;
              const context = this.context;

// draw outer circle
              context.clearRect(0, 0, this.width, this.height);
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
              context.fillStyle = 'rgba(255, 255, 255, 0.2)';
              context.fill();

// draw inner circle
              context.beginPath();
              context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
              context.fillStyle = color;
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
    self.map.addImage('pulsing-dot; lat:' + lat.toString() + ' lon:' + lng.toString(), pulsingDot, {pixelRatio: 4});
    self.map.addLayer({
          id: 'points; lat: ' + lat.toString() + ' lon:' + lng.toString(),
          type: 'symbol',
          source: {
              type: 'geojson',
              data: {
                  type: 'FeatureCollection',
                  features: [{
                      type: 'Feature',
                      geometry: {
                          type: 'Point',
                          coordinates: [lng, lat],
                      }
                  }]
              }
          },
          layout: {
              'icon-image': 'pulsing-dot; lat:' + lat.toString() + ' lon:' + lng.toString()
          }
      });
    self.map.on('click', 'points; lat: ' + lat.toString() + ' lon:' + lng.toString(), (e) => {
        const description = '<strong>' + name + '</strong>' + '<br>' +
            '<ion-button id=' + roomID + ' +  size="small" mode="ios" expand="block" color="primary">Go <ion-icon slot="end" name="paper-plane" mode="ios">' +
            '</ion-icon></ion-button>';
        new mapboxgl.Popup({className: 'popover-class'}).setLngLat([lng, lat]).setHTML(description).addTo(self.map);
        // document.getElementById(roomID).onclick = this.goToRoom(name, roomID) as any;
        document.getElementById(roomID).addEventListener('click', () => {
            this.nav.navigateForward('room/' + name + '/' + roomID);
        });
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
            {lat: this.currentLat, lon: this.currentLon, color: this.currentColor, name: data.GroupName},
        {headers: headersSend});
    response.subscribe(async (res: any) => {
            console.log(res);
            if (res.success === 'true') {
              this.closeAddGroup();
              this.makePoint(res.room_name, this.currentLat, this.currentLon, this.currentColor, res.room_id);
            }
    });
  }
}
