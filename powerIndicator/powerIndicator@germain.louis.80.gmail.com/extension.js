const St = imports.gi.St;
const Main = imports.ui.main;
const GLib = imports.gi.GLib;
const MainLoop = imports.mainloop;
const Lang = imports.lang;
const PanelMenu = imports.ui.panelMenu;
const Clutter = imports.gi.Clutter;
const Gio = imports.gi.Gio;
const DATAPATH = "/sys/class/power_supply/BAT1/power_now";
const DATAPATH2 = "/sys/class/power_supply/BAT0/power_now";


const PowerIndicator = new Lang.Class({
  Name: 'PowerIndicator',
  Extends: PanelMenu.Button,
  powerMeasures: [],


  _init: function(){
    this.parent(0.0, "PowerIndicator", false);
    this.buttonText = new St.Label({
      text: _("Loading..."),
      y_align: Clutter.ActorAlign.CENTER
    });
    this.actor.add_actor(this.buttonText);
    this._refresh();
  },

  _refresh: function(){
    this._updatePowerMeasures(this._getCurrentPower());
    let value = (this._averageTab(this.powerMeasures)).toFixed(2)+"W";
    this.buttonText.set_text(value);
    this._removeTimeout();
    this._timeout = MainLoop.timeout_add_seconds(3, Lang.bind(this, this._refresh));
  },

  _updatePowerMeasures: function(lastValue){
    if(this.powerMeasures.length>=5){
      this.powerMeasures.shift();
    };
    this.powerMeasures.push(lastValue);
  },

  _averageTab: function(tab){
    let sum=0;
    for(i=0;i<tab.length;i++){
      sum=sum+tab[i];
    };
    return sum/tab.length;
  },

  _getCurrentPower: function(){
    let currentPower=0
    currentPower=Number(GLib.file_get_contents(DATAPATH)[1])/1000000;
    if(currentPower == 0)
	currentPower=Number(GLib.file_get_contents(DATAPATH2)[1])/1000000;
    return currentPower;
  },

  _removeTimeout: function(){
    if(this._timeout){
      MainLoop.source_remove(this._timeout);
      this._timeout = null;
    }
  }
})


function init() {
}

let indicator;

function enable() {
    indicator = new PowerIndicator();
    Main.panel.addToStatusArea("power-indicator", indicator);
}

function disable() {
    indicator.destroy();
}
