'use strict';

// CMF Buds
export default {
    modelId: 'B168',
    name: 'CMF Buds',
    pattern: /.*CMF\s+Buds(?!\s*(Pro|2|Plus)).*/i,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        dirac: 0x00,
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
                    'no-action',
                ],
            },
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
                    'noise-control',
                    'voice-assistant',
                    'no-action',
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
        nonAssignable: {
            singlePinch: ['call-answer'],
            doublePinch: ['call-hangup', 'call-decline'],
        },
    },

    albumArtIcon: 'earbuds-stem',
    budsIcon: 'earbuds-stem',
    case: 'case-square',
};

