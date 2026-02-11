'use strict';

import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

export const ToggleButtonsSet = GObject.registerClass({
    GTypeName: 'BudsLink_ToggleButtonsSet',
}, class ToggleButtonsSet extends Gtk.Box {
    _init(isSecondSet, dataHandler) {
        super._init({
            orientation: Gtk.Orientation.VERTICAL,
            spacing: 6,
            margin_top: 8,
            margin_bottom: 8,
            margin_start: 8,
            margin_end: 8,
        });

        this._isSecondSet = isSecondSet;
        this._dataHandler = dataHandler;

        this._group = null;
        this._titleLabel = null;

        this._buildUI();
        this._syncFromProps();

        this._dataHandlerIdConfig = this._dataHandler.connect('configuration-changed', () => {
            this._buildUI();
            this._syncFromProps();
        });

        this._dataHandlerIdProp = this._dataHandler.connect('properties-changed', () => {
            this._syncFromProps();
        });
    }

    _buildUI() {
        let child;
        while ((child = this.get_first_child()))
            this.remove(child);

        this._group = null;
        this._titleLabel = null;

        const config = this._dataHandler.getConfig();

        const title = this._isSecondSet ? config.toggle2Title : config.toggle1Title;

        const icons = [
            this._isSecondSet ? config.toggle2Button1Icon : config.toggle1Button1Icon,
            this._isSecondSet ? config.toggle2Button2Icon : config.toggle1Button2Icon,
            this._isSecondSet ? config.toggle2Button3Icon : config.toggle1Button3Icon,
            this._isSecondSet ? config.toggle2Button4Icon : config.toggle1Button4Icon,
        ];

        const names = [
            this._isSecondSet ? config.toggle2Button1Name : config.toggle1Button1Name,
            this._isSecondSet ? config.toggle2Button2Name : config.toggle1Button2Name,
            this._isSecondSet ? config.toggle2Button3Name : config.toggle1Button3Name,
            this._isSecondSet ? config.toggle2Button4Name : config.toggle1Button4Name,
        ];

        if (title) {
            this._titleLabel = new Gtk.Label({
                label: title,
                halign: Gtk.Align.CENTER,
                css_classes: ['heading'],
            });
            this.append(this._titleLabel);
        }

        this._group = new Adw.ToggleGroup({
            orientation: Gtk.Orientation.HORIZONTAL,
            halign: Gtk.Align.CENTER,
            css_classes: ['budslink-toggle-group'],
        });

        this.append(this._group);

        icons.forEach((iconName, index) => {
            if (!iconName)
                return;

            const toggle = new Adw.Toggle({
                icon_name: iconName.replace(/\.svg$/, ''),
                tooltip: names[index] || '',
                name: String(index + 1),
            });

            this._group.add(toggle);
        });

        this._groupNotifyId =
            this._group.connect('notify::active', () => {
                const active = this._group.active;
                if (active < 0)
                    return;

                const stateProp = this._isSecondSet ? 'toggle2State' : 'toggle1State';

                this._dataHandler.emitUIAction(stateProp, active + 1);
            });
    }

    _syncFromProps() {
        if (!this._group)
            return;

        const props = this._dataHandler.getProps();
        const index = this._isSecondSet ? props.toggle2State : props.toggle1State;

        if (index > 0) {
            const desired = index - 1;
            if (this._group.active !== desired)
                this._group.active = desired;
        }
    }

    destroy() {
        if (this._group && this._groupNotifyId)
            this._group.disconnect(this._groupNotifyId);

        if (this._group)
            this._group.remove_all();

        if (this._dataHandler && this._dataHandlerIdConfig)
            this._dataHandler.disconnect(this._dataHandlerIdConfig);

        if (this._dataHandler && this._dataHandlerIdProp)
            this._dataHandler.disconnect(this._dataHandlerIdProp);

        this._groupNotifyId = null;
        this._dataHandlerIdConfig = null;
        this._dataHandlerIdProp = null;
        this._dataHandler = null;
    }
});

