'use strict';

// Nothing Ear (2)
export default {
    modelId: 'B173',
    name: 'Nothing Ear (3)',
    pattern: /^.*Nothing Ear \(3\)$/,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
        custom: 0x05,
        advance: 0x06,
    },

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

    personalizeAnc: true,

    inEarDetection: true,
    lowLatencyMode: true,
    earTipTest: true,
    ring: true,
    dualConnection: true,
    dualConnectionReboot: false,

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
                'mic-mute': [0x1D],
                'new-reporter': [0x21],
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
                    'new-reporter',
                    'no-action',
                ],
            },
            actionAndHold: {
                type: 'press',
                actions: [
                    'noise-control',
                    'volume-up',
                    'volume-down',
                    'voice-assistant',
                    'new-reporter',
                    'no-action',
                ],
            },
            doubleActionAndHold: {
                type: 'press',
                actions: [
                    'noise-control',
                    'volume-up',
                    'volume-down',
                    'voice-assistant',
                    'new-reporter',
                    'no-action',
                ],
            },
        },
        noiseControlModes: ['off', 'transparency', 'noise-cancellation'],
        nonAssignable: {
            single: ['play-pause', 'call-answer', 'call-hangup'],
            double: ['call-decline'],
        },
    },

    albumArtIcon: 'earbuds-stem',
    budsIcon: 'earbuds-stem',
    case: 'case-square',
};

