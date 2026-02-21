'use strict';

export default {
    modelId: 'B181',
    name: 'Nothing ear (1)',
    pattern: /^.*Nothing ear \(1\)$/,

    noUTCTimeUpdate: true,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
    },


    noiseControl: {
        off: {byte: 0x05},
        transparency: {byte: 0x07},
        noiseCancellation: {
            levels: {
                high: 0x01,
                low: 0x03,
            },
        },
    },

    inEarDetection: false,
    lowLatencyMode: true,
    ring: true,
    ringLegacy: true,
    dualConnection: false,

    gestureOptions: {
        device: {
            'left': 0x02,
            'right': 0x03,
        },
        mapping: {
            gestureTypes: {
                triple: 0x03,
                actionAndHold: 0x07,
            },

            actions: {
                'no-action': [0x01],
                'skip-back': [0x08],
                'skip-forward': [0x09],
                'voice-assistant': [0x0B],
                'anc-type': [0x0A],
            },
        },
        gestures: {
            triple: {
                type: 'tap',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                    'no-action',
                ],
            },
            actionAndHold: {
                type: 'tap',
                actions: [
                    'anc-type',
                    'no-action',
                ],
            },
        },
        nonAssignable: {
            actionAndhold: ['call-decline'],
            double: ['play-pause'],
            slide: ['change-volume'],
        },
    },

    albumArtIcon: 'earbuds-stem',
    budsIcon: 'earbuds-stem',
    case: 'case-square',
};

