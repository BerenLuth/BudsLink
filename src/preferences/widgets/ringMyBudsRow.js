import GObject from 'gi://GObject';
import Gtk from 'gi://Gtk';
import Adw from 'gi://Adw';

export const RingMyBudsRow = GObject.registerClass({
    GTypeName: 'RingMyBudsRow',
    Properties: {
        'status': GObject.ParamSpec.string(
            'status', 'Status', 'Single/Right earbud status',
            GObject.ParamFlags.READWRITE | GObject.ParamFlags.EXPLICIT_NOTIFY,
            'stopped'
        ),
        'status-left': GObject.ParamSpec.string(
            'status-left', 'Status Left', 'Left earbud status',
            GObject.ParamFlags.READWRITE | GObject.ParamFlags.EXPLICIT_NOTIFY,
            'stopped'
        ),
    },
}, class RingMyBudsRow extends Adw.ActionRow {
    _init(_, params = {}) {
        const {title = _('Find my earbuds'), dual = false, ...args} = params;
        super._init({title, ...args});

        this._gettext = _;
        this._dual = dual;

        this._status = 'stopped';
        this._statusLeft = 'stopped';

        if (!dual) {
            this._buttonContent = new Adw.ButtonContent({
                icon_name: 'bbm-play-symbolic',
                label: _('Play'),
            });

            this._button = new Gtk.Button({
                valign: Gtk.Align.CENTER,
                child: this._buttonContent,
                css_classes: ['suggested-action'],
            });

            this.add_suffix(this._button);
            this.activatable_widget = this._button;

            this._button.connect('clicked', () => {
                if (this.status === 'playing')
                    this._stop();
                else
                    this._confirmAndPlay();
            });
        } else {
            this._container = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 18});

            this._buttonContentLeft = new Adw.ButtonContent({
                icon_name: 'bbm-play-symbolic',
                label: _('Play'),
            });
            this._buttonLeft = new Gtk.Button({
                valign: Gtk.Align.CENTER,
                child: this._buttonContentLeft,
                css_classes: ['suggested-action'],
            });

            const leftLabel = new Gtk.Label({label: 'L', xalign: 0, css_classes: ['heading']});
            const leftBox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 6});
            leftBox.append(leftLabel);
            leftBox.append(this._buttonLeft);

            this._buttonContentRight = new Adw.ButtonContent({
                icon_name: 'bbm-play-symbolic',
                label: _('Play'),
            });
            this._buttonRight = new Gtk.Button({
                valign: Gtk.Align.CENTER,
                child: this._buttonContentRight,
                css_classes: ['suggested-action'],
            });

            const rightLabel = new Gtk.Label({label: 'R', xalign: 0, css_classes: ['heading']});
            const rightBox = new Gtk.Box({orientation: Gtk.Orientation.HORIZONTAL, spacing: 6});
            rightBox.append(rightLabel);
            rightBox.append(this._buttonRight);

            this._container.append(leftBox);
            this._container.append(rightBox);

            this.add_suffix(this._container);

            this._buttonLeft.connect('clicked', () => {
                if (this.statusLeft === 'playing')
                    this._stop('left');
                else
                    this._confirmAndPlay('left');
            });

            this._buttonRight.connect('clicked', () => {
                if (this.status === 'playing')
                    this._stop('right');
                else
                    this._confirmAndPlay('right');
            });
        }
    }

    get status() {
        return this._status;
    }

    set status(value) {
        if (this._status === value)
            return;
        this._status = value;
        if (!this._dual)
            this._updateButton('right');
        this.notify('status');
    }

    get statusLeft() {
        return this._statusLeft;
    }

    set statusLeft(value) {
        if (this._statusLeft === value)
            return;
        this._statusLeft = value;
        if (this._dual)
            this._updateButton('left');
        this.notify('status-left');
    }

    _updateButton(side = 'right') {
        const _ = this._gettext;

        if (!this._dual && side === 'right') {
            this._buttonContent.icon_name =
                this._status === 'playing' ? 'bbm-stop-symbolic' : 'bbm-play-symbolic';

            this._buttonContent.label = this._status === 'playing' ? _('Stop') : _('Play');
        }

        if (this._dual) {
            if (side === 'right') {
                this._buttonContentRight.icon_name =
                    this._status === 'playing' ? 'bbm-stop-symbolic' : 'bbm-play-symbolic';

                this._buttonContentRight.label = this._status === 'playing' ? _('Stop') : _('Play');
            } else if (side === 'left') {
                this._buttonContentLeft.icon_name =
                    this._statusLeft === 'playing' ? 'bbm-stop-symbolic' : 'bbm-play-symbolic';

                this._buttonContentLeft.label =
                    this._statusLeft === 'playing' ? _('Stop') : _('Play');
            }
        }
    }

    _confirmAndPlay(side = 'right') {
        const _ = this._gettext;
        const dialog = new Adw.AlertDialog({
            heading: _('Continue?'),
            body: _(
                'Your earbuds/headset may be in use. Be sure to remove them from your ears ' +
                'before you continue. A loud sound will be played which could be ' +
                'uncomfortable for anyone wearing them.'
            ),
        });

        dialog.add_response('cancel', _('Cancel'));
        dialog.add_response('continue', _('Play'));

        dialog.set_response_appearance('continue', Adw.ResponseAppearance.SUGGESTED);
        dialog.set_default_response('continue');
        dialog.set_close_response('cancel');

        dialog.connect('response', (_dialog, response) => {
            if (response === 'continue')
                this._play(side);
        });

        dialog.present(this.get_root());
    }

    _play(side = 'right') {
        if (side === 'left')
            this.statusLeft = 'playing';
        else
            this.status = 'playing';
    }

    _stop(side = 'right') {
        if (side === 'left')
            this.statusLeft = 'stopped';
        else
            this.status = 'stopped';
    }
});
