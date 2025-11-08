
[Requesting] Received request for path: /User/login

Requesting.request { username: 'a', password: 'b', path: '/User/login' } => { request: '019a61e4-a85c-7ee5-853b-be49b2501632' }


User.login { username: 'w', password: 'w' } => { user: 019a50ae-4bc6-7072-9508-46e9a99ee4a9' }


Sessioning.create { user: 019a50ae-4bc6-7072-9508-46e9a99ee4a9' } => { session:  '019a61df-0566-7f82-ac8b-60d250cdf65e' }     


Requesting.respond {
  request: '019a61e4-a85c-7ee5-853b-be49b2501632',
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e'
} => { request: '019a61e4-a85c-7ee5-853b-be49b2501632' }

[Requesting] Received request for path: /ManageVideo/_getAllReferenceVideos

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  path: '/ManageVideo/_getAllReferenceVideos'
} => { request: '019a61e4-a8ff-7834-b8b7-ea8b1ed7781c' }

Getting all reference videos for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Found reference videos: [{...}]
Videos fetched: 1

Requesting.respond { request: '019a61e4-a8ff-7834-b8b7-ea8b1ed7781c', results: [] } => { request: '019a61e4-a8ff-7834-b8b7-ea8b1ed7781c' }

…
"26": {
          x: 0.3547223210334778,
          y: 0.7157135009765625,
          z: -0.220255509018898
        },
        "27": {
          x: 0.8371026515960693,
          y: 0.8799322843551636,
          z: 0.15604999661445618
        },
        "28": {
          x: 0.24771732091903687,
          y: 0.8566689491271973,
          z: 0.24226883053779602
        }
      },
      ... 73 more items
    ]
  }
]
Videos fetched: 1

Requesting.respond {
  request: '019a61df-844b-73d0-8d31-d6a50c262028',
  results: [
    {
      _id: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'reference',
      videoName: 'ref 1',
      referenceVideoId: 'null',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/reference/019a50c1-89f7-7d29-8990-8ecfb3c9e888_1762291452408.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/reference/019a50c1-89f7-7d29-8990-8ecfb3c9e888_1762291452408.mp4',   
      feedback: null,
      poseData: [Array]
    }
  ]
} => { request: '019a61df-844b-73d0-8d31-d6a50c262028' }


[Requesting] Received request for path: /ManageVideo/_retrieve

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
  path: '/ManageVideo/_retrieve'
} => { request: '019a61e0-59dd-7ce6-ade2-1e22fd7d9faa' }

Authorizing retrieve video request Symbol(session) Symbol(user)
Retrieving video: 019a50c1-89f7-7d29-8990-8ecfb3c9e888 for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Video retrieved: 019a50c1-89f7-7d29-8990-8ecfb3c9e888

Requesting.respond {
  request: '019a61e0-59dd-7ce6-ade2-1e22fd7d9faa',
  result: {
    _id: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
    owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
    videoType: 'reference',
    videoName: 'ref 1',
    referenceVideoId: 'null',
    gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/reference/019a50c1-89f7-7d29-8990-8ecfb3c9e888_1762291452408.mp4',
    gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/reference/019a50c1-89f7-7d29-8990-8ecfb3c9e888_1762291452408.mp4',     
    feedback: null,
    poseData: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 73 more items
    ]
  }
} => { request: '019a61e0-59dd-7ce6-ade2-1e22fd7d9faa' }

[Requesting] Received request for path: /ManageVideo/_getPracticeVideos

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
  path: '/ManageVideo/_getPracticeVideos'
} => { request: '019a61e0-62b0-774a-9738-652adeb28310' }

Practice videos fetched: 5

Requesting.respond {
  request: '019a61e0-62b0-774a-9738-652adeb28310',
  results: [
    {
      _id: '019a50e9-b902-7402-bb45-7315af952e1f',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'practice',
      videoName: 'ref 1, prac 1',
      referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',    
      feedback: '019a5112-6ecd-7ccf-a821-28dd7175bfdc',
      poseData: [Array],
      matchingFrames: [Object]
    },
    {
      _id: '019a512f-2605-7755-a4c0-54d4a1240c07',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'practice',
      videoName: 'ref 1, prac 2',
      referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a512f-2605-7755-a4c0-54d4a1240c07_1762298635781.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a512f-2605-7755-a4c0-54d4a1240c07_1762298635781.mp4',    
      feedback: null,
      poseData: []
    },
    {
      _id: '019a5131-0ab2-707e-a22d-ef7739126c86',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'practice',
      videoName: 'ref 1, prac 3',
      referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a5131-0ab2-707e-a22d-ef7739126c86_1762298759858.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a5131-0ab2-707e-a22d-ef7739126c86_1762298759858.mp4',    
      feedback: '019a5131-c914-7aa6-8d4d-0f133c0e3c93',
      poseData: [Array],
      matchingFrames: [Object]
    },
    {
      _id: '019a5133-aa05-7014-a3f3-f69b2cce17ff',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'practice',
      videoName: 'ref 1, prac 4',
      referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a5133-aa05-7014-a3f3-f69b2cce17ff_1762298931717.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a5133-aa05-7014-a3f3-f69b2cce17ff_1762298931717.mp4',    
      feedback: null,
      poseData: []
    },
    {
      _id: '019a61df-77bb-7b04-acda-4d940b1beac0',
      owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
      videoType: 'practice',
      videoName: 'ref 1, prac 5',
      referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
      gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',
      gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',    
      feedback: null,
      poseData: []
    }
  ]
} => { request: '019a61e0-62b0-774a-9738-652adeb28310' }

[Requesting] Received request for path: /ManageVideo/_retrieve

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a50e9-b902-7402-bb45-7315af952e1f',
  path: '/ManageVideo/_retrieve'
} => { request: '019a61e0-636f-787d-b897-576832c669ec' }

Authorizing retrieve video request Symbol(session) Symbol(user)
Retrieving video: 019a50e9-b902-7402-bb45-7315af952e1f for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Video retrieved: 019a50e9-b902-7402-bb45-7315af952e1f

Requesting.respond {
  request: '019a61e0-636f-787d-b897-576832c669ec',
  result: {
    _id: '019a50e9-b902-7402-bb45-7315af952e1f',
    owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
    videoType: 'practice',
    videoName: 'ref 1, prac 1',
    referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
    gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',
    gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',      
    feedback: '019a5112-6ecd-7ccf-a821-28dd7175bfdc',
    poseData: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 73 more items
    ],
    matchingFrames: {
      referenceStartFrame: '0',
      referenceEndFrame: '172',
      practiceStartFrame: '0',
      practiceEndFrame: '172'
    }
  }
} => { request: '019a61e0-636f-787d-b897-576832c669ec' }


Feedback.getFeedback { feedback: '019a5112-6ecd-7ccf-a821-28dd7175bfdc' } => {
  feedbackText: 'Great job! Overall accuracy: 100%',
  accuracyValue: 100
}

[Requesting] Received request for path: /ManageVideo/_retrieve

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a61df-77bb-7b04-acda-4d940b1beac0',
  path: '/ManageVideo/_retrieve'
} => { request: '019a61e2-2ea8-72eb-a8d9-514043980d77' }

Authorizing retrieve video request Symbol(session) Symbol(user)
Retrieving video: 019a61df-77bb-7b04-acda-4d940b1beac0 for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Video retrieved: 019a61df-77bb-7b04-acda-4d940b1beac0

Requesting.respond {
  request: '019a61e2-2ea8-72eb-a8d9-514043980d77',
  result: {
    _id: '019a61df-77bb-7b04-acda-4d940b1beac0',
    owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
    videoType: 'practice',
    videoName: 'ref 1, prac 5',
    referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
    gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',
    gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',      
    feedback: null,
    poseData: []
  }
} => { request: '019a61e2-2ea8-72eb-a8d9-514043980d77' }

…  {
      '0': [Object],
      '11': [Object],
      '12': [Object],
      '13': [Object],
      '14': [Object],
      '15': [Object],
      '16': [Object],
      '23': [Object],
      '24': [Object],
      '25': [Object],
      '26': [Object],
      '27': [Object],
      '28': [Object]
    },
    ... 4 more items
  ]
} => {
  feedback: '019a61e3-0b87-7209-9734-4bd4899a1095',
  feedbackText: 'Overall accuracy: 33%. Focus on improving at seconds: 2.0s (0%), 2.1s (0%), 2.2s (0%)'
}

[Requesting] Received request for path: /ManageVideo/storeFeedback

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a61df-77bb-7b04-acda-4d940b1beac0',
  feedbackId: '019a61e3-0b87-7209-9734-4bd4899a1095',
  path: '/ManageVideo/storeFeedback'
} => { request: '019a61e3-0be5-78f4-9fbb-6f29819790f5' }

Storing feedback for video: 019a61df-77bb-7b04-acda-4d940b1beac0 feedback: 019a61e3-0b87-7209-9734-4bd4899a1095 by caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Feedback stored successfully: {
  acknowledged: true,
  modifiedCount: 1,
  upsertedId: null,
  upsertedCount: 0,
  matchedCount: 1
}

ManageVideo.storeFeedback {
  video: '019a61df-77bb-7b04-acda-4d940b1beac0',
  feedbackId: '019a61e3-0b87-7209-9734-4bd4899a1095',
  caller: '019a50ae-4bc6-7072-9508-46e9a99ee4a9'
} => {}


Requesting.respond { request: '019a61e3-0be5-78f4-9fbb-6f29819790f5', status: 'success' } => { request: '019a61e3-0be5-78f4-9fbb-6f29819790f5' }

[Requesting] Received request for path: /ManageVideo/_retrieve

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a61df-77bb-7b04-acda-4d940b1beac0',
  path: '/ManageVideo/_retrieve'
} => { request: '019a61e3-0c69-7321-9fd7-14d708316e4a' }

Authorizing retrieve video request Symbol(session) Symbol(user)
Retrieving video: 019a61df-77bb-7b04-acda-4d940b1beac0 for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Video retrieved: 019a61df-77bb-7b04-acda-4d940b1beac0

Requesting.respond {
  request: '019a61e3-0c69-7321-9fd7-14d708316e4a',
  result: {
    _id: '019a61df-77bb-7b04-acda-4d940b1beac0',
    owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
    videoType: 'practice',
    videoName: 'ref 1, prac 5',
    referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
    gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',
    gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a61df-77bb-7b04-acda-4d940b1beac0_1762578626491.mp4',      
    feedback: '019a61e3-0b87-7209-9734-4bd4899a1095',
    poseData: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 4 more items
    ],
    matchingFrames: {
      referenceStartFrame: 45,
      referenceEndFrame: 148,
      practiceStartFrame: 0,
      practiceEndFrame: 103
    }
  }
} => { request: '019a61e3-0c69-7321-9fd7-14d708316e4a' }


Feedback.getFeedback { feedback: '019a61e3-0b87-7209-9734-4bd4899a1095' } => {
  feedbackText: 'Overall accuracy: 33%. Focus on improving at seconds: 2.0s (0%), 2.1s (0%), 2.2s (0%)',
  accuracyValue: 33
}


[Requesting] Received request for path: /ManageVideo/_retrieve

Requesting.request {
  session: '019a61df-0566-7f82-ac8b-60d250cdf65e',
  video: '019a50e9-b902-7402-bb45-7315af952e1f',
  path: '/ManageVideo/_retrieve'
} => { request: '019a61e3-a992-7f32-9494-c22afe3009b3' }

Authorizing retrieve video request Symbol(session) Symbol(user)
Retrieving video: 019a50e9-b902-7402-bb45-7315af952e1f for caller: 019a50ae-4bc6-7072-9508-46e9a99ee4a9
Video retrieved: 019a50e9-b902-7402-bb45-7315af952e1f

Requesting.respond {
  request: '019a61e3-a992-7f32-9494-c22afe3009b3',
  result: {
    _id: '019a50e9-b902-7402-bb45-7315af952e1f',
    owner: '019a50ae-4bc6-7072-9508-46e9a99ee4a9',
    videoType: 'practice',
    videoName: 'ref 1, prac 1',
    referenceVideoId: '019a50c1-89f7-7d29-8990-8ecfb3c9e888',
    gcsUrl: 'https://storage.googleapis.com/mirror-motion-test-bucket/019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',
    gcsFileName: '019a50ae-4bc6-7072-9508-46e9a99ee4a9/practice/019a50e9-b902-7402-bb45-7315af952e1f_1762294085891.mp4',      
    feedback: '019a5112-6ecd-7ccf-a821-28dd7175bfdc',
    poseData: [
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object], [Object], [Object],
      [Object], [Object], [Object], [Object],
      ... 73 more items
    ],
    matchingFrames: {
      referenceStartFrame: '0',
      referenceEndFrame: '172',
      practiceStartFrame: '0',
      practiceEndFrame: '172'
    }
  }
} => { request: '019a61e3-a992-7f32-9494-c22afe3009b3' }


Feedback.getFeedback { feedback: '019a5112-6ecd-7ccf-a821-28dd7175bfdc' } => {
  feedbackText: 'Great job! Overall accuracy: 100%',
  accuracyValue: 100
}

