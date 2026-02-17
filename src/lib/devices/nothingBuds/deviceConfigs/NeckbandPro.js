'use strict';

export default {
    modelId: 'B164',
    name: 'Neckband Pro',
    pattern: /^.*CMF Neckband Pro$/,

    batterySingle: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
        custom: 0x05,
    },

    bassEnhanceLevel: 5,

    noiseControl: {
        off: {byte: 0x05},
        transparency: {byte: 0x07},
        noiseCancellation: {
            levels: {
                high: 0x01,
                mid: 0x02,
                low: 0x03,
                adaptive: 0x04,
            },
        },
    },

    lowLatencyMode: true,
    ring: true,

    gestureOptions: {
        device: {
            'single': 0x06,
        },
        mapping: {
            gestureTypes: {
                double: 0x02,
                triple: 0x03,
                actionAndHold: 0x07,
            },

            actions: {
                'skip-back': [0x08],
                'skip-forward': [0x09],
                'voice-assistant': [0x0B],
                'noise-control': [0x0A, 0x14, 0x15, 0x16],
            },
        },
        gestures: {
            double: {
                type: 'press',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                ],
            },
            triple: {
                type: 'press',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                ],
            },
            actionAndHold: {
                type: 'press',
                actions: [
                    'noise-control',
                ],
            },
        },
        noiseControlModes: ['off', 'transparency', 'noise-cancellation'],
        nonAssignable: {
            single: ['play-pause', 'call-answer', 'call-hangup'],
            double: ['call-decline'],
            rotate: ['volume-control'],
        },
    },


    albumArtIcon: 'earbuds-neckband',
    budsIcon: 'earbuds-neckband',
};

