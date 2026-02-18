'use strict';

export default {
    modelId: 'B174',
    name: 'Nothing Ear (open)',
    pattern: /^.*Nothing Ear \(open\)$/,

    batteryLR: true,
    batteryCase: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
        custom: 0x05,
    },

    lowLatencyMode: true,

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
                ],
            },
            actionAndHold: {
                type: 'pinch',
                actions: [
                    'volume-up',
                    'volume-down',
                    'voice-assistant',
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
        nonAssignable: {
            single: ['play-pause', 'call-answer', 'call-hangup'],
            double: ['call-decline'],
        },
    },

    albumArtIcon: 'earbuds-wingtip2',
    budsIcon: 'earbuds-wingtip2',
    case: 'case-oval',
};

