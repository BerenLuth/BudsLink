'use strict';

// CMF Buds 2a
export default {
    modelId: 'B185',
    name: 'CMF Buds 2a',
    pattern: /.*CMF\s+Buds\s+2a.*/i,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        dirac: 0x07,
        rock: 0x01,
        electronic: 0x02,
        pop: 0x03,
        enhance_vocals: 0x04,
        classical: 0x05,
        custom: 0x06,
    },
    eqListeningModeType: true,

    bassEnhanceLevel: 5,

    noiseControl: {
        off: {byte: 0x05},
        noiseCancellation: {byte: 0x04},
        transparency: {byte: 0x07},
    },

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
                type: 'pinch',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                ],
            },
            triple: {
                type: 'pinch',
                actions: [
                    'skip-back',
                    'skip-forward',
                    'voice-assistant',
                    'no-action',
                ],
            },
            actionAndHold: {
                type: 'pinch',
                actions: [
                    'noise-control',
                    'voice-assistant',
                    'no-action',
                ],
            },
            doubleActionAndHold: {
                type: 'pinch',
                actions: [
                    'volume-up',
                    'volume-down',
                    'voice-assistant',
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

