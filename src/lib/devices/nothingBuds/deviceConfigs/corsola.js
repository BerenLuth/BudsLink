'use strict';

// CMF Buds Pro
export default {
    modelId: 'B163',
    name: 'CMF Buds Pro',
    pattern: /.*CMF\s+Buds\s+Pro.*/i,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
        custom: 0x05,
    },

    noiseControl: {
        off: {byte: 0x05},
        transparency: {byte: 0x07},
        noiseCancellation: {
            levels: {
                high: 0x01,
                mid: 0x02,
                low: 0x03,
            },
        },
    },

    inEarDetection: true,
    lowLatencyMode: true,
    ring: true,

    gestureOptions: {
        device: {
            'left': 0x02,
            'right': 0x03,
        },
        mapping: {
            gestureTypes: {
                double: 0x02,
                triple: 0x03,
                actionAndHold: 0x07,
                doubleActionAndHold: 0x09,
            },

            actions: {
                'no-action': [0x01],
                'skip-back': [0x08],
                'skip-forward': [0x09],
                'voice-assistant': [0x0B],
                'volume-up': [0x12],
                'volume-down': [0x13],
                'noise-control': [0x0A, 0x14, 0x15, 0x16],
            },
        },
        gestures: {
            double: {
                type: 'tap',
                actions: [
                    'play-pause',
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                ],
            },
            triple: {
                type: 'tap',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                ],
            },
            actionAndHold: {
                type: 'tap',
                actions: [
                    'noise-control',
                    'voice-assistant',
                ],
            },
            doubleActionAndHold: {
                type: 'tap',
                actions: [
                    'volume-up',
                    'volume-down',
                    'voice-assistant',
                    'no-action',
                ],
            },
        },
        noiseControlModes: ['off', 'transparency', 'noise-cancellation'],
    },

    albumArtIcon: 'earbuds-stem',
    budsIcon: 'earbuds-stem',
    case: 'case-round',
};

