'use strict';

// Nothing Headphone (1)
export default {
    modelId: 'B175',
    name: 'CMF Headphone Pro',
    pattern: /^.*CMF Headphone Pro$/,

    batterySingle: true,

    eqPreset: {
        balanced: 0x00,
        voice: 0x01,
        more_treble: 0x02,
        more_bass: 0x03,
        custom: 0x05,
        advance: 0x06,
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

    inEarDetection: true,
    lowLatencyMode: true,
    ring: true,

    gestureOptions: {
        device: {
            'single': 0x06,
        },
        mapping: {
            gestureTypes: {
                single: 0x01,
                actionAndHold: 0x07,
            },

            actions: {
                'no-action': [0x01],
                'channel-hop': [0x20],
                'voice-assistant': [0x0B],
                'new-reporter': [0x1F],
                'spatial-audio': [0x1B],
                'mic-mute': [0x1D],
                'eq-preset': [0x22],
                'noise-control': [0x0A, 0x14, 0x15, 0x16],
            },
        },
        gestures: {
            single: {
                type: 'press',
                actions: [
                    'channel-hop',
                    'voice-assistant',
                    'new-reporter',
                    'noise-control',
                    'spatial-audio',
                    'mic-mute',
                    'eq-preset',
                    'no-action',
                ],
            },
            actionAndHold: {
                type: 'press',
                actions: [
                    'channel-hop',
                    'voice-assistant',
                    'new-reporter',
                    'noise-control',
                    'spatial-audio',
                    'mic-mute',
                    'eq-preset',
                    'no-action',
                ],
            },
            roller: {
                type: 'roller',
                action: [
                    'noise-control',
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

    albumArtIcon: 'headphone1',
    budsIcon: 'headphone1',
};

