/**
 * eslint-env jest
 * @jest-environment node
 */

import * as Benchmark from 'benchmark'


function add (
  leftBuffer, rightBuffer, resultBuffer, dimension
) {
  let index = dimension
  while (dimension --) {
    resultBuffer[index] = leftBuffer[index] + rightBuffer[index]
  }
}

function add5 (leftBuffer, rightBuffer, resultBuffer) {
  resultBuffer[0] = leftBuffer[0] + rightBuffer[0]
  resultBuffer[1] = leftBuffer[1] + rightBuffer[1]
  resultBuffer[2] = leftBuffer[2] + rightBuffer[2]
  resultBuffer[3] = leftBuffer[3] + rightBuffer[3]
  resultBuffer[4] = leftBuffer[4] + rightBuffer[4]
}

function add5s (leftBuffer, rightBuffer, resultBuffer) {
  const a1 = leftBuffer[0]
  const a2 = leftBuffer[1]
  const a3 = leftBuffer[2]
  const a4 = leftBuffer[3]
  const a5 = leftBuffer[4]

  const b1 = rightBuffer[0]
  const b2 = rightBuffer[1]
  const b3 = rightBuffer[2]
  const b4 = rightBuffer[3]
  const b5 = rightBuffer[4]

  resultBuffer[0] = a1 + b1
  resultBuffer[1] = a2 + b2
  resultBuffer[2] = a3 + b3
  resultBuffer[3] = a4 + b4
  resultBuffer[4] = a5 + b5
}

function add5so (leftBuffer, rightBuffer, resultBuffer, leftBufferOffset, rightBufferOffset, resultBufferOffset) {
  const a1 = leftBuffer[leftBufferOffset + 0]
  const a2 = leftBuffer[leftBufferOffset + 1]
  const a3 = leftBuffer[leftBufferOffset + 2]
  const a4 = leftBuffer[leftBufferOffset + 3]
  const a5 = leftBuffer[leftBufferOffset + 4]

  const b1 = rightBuffer[rightBufferOffset + 0]
  const b2 = rightBuffer[rightBufferOffset + 1]
  const b3 = rightBuffer[rightBufferOffset + 2]
  const b4 = rightBuffer[rightBufferOffset + 3]
  const b5 = rightBuffer[rightBufferOffset + 4]

  resultBuffer[resultBufferOffset + 0] = a1 + b1
  resultBuffer[resultBufferOffset + 1] = a2 + b2
  resultBuffer[resultBufferOffset + 2] = a3 + b3
  resultBuffer[resultBufferOffset + 3] = a4 + b4
  resultBuffer[resultBufferOffset + 4] = a5 + b5
}

function add5sop (leftBuffer, rightBuffer, resultBuffer, leftBufferOffset = 0, rightBufferOffset = 0, resultBufferOffset = 0) {
  const a1 = leftBuffer[leftBufferOffset + 0]
  const a2 = leftBuffer[leftBufferOffset + 1]
  const a3 = leftBuffer[leftBufferOffset + 2]
  const a4 = leftBuffer[leftBufferOffset + 3]
  const a5 = leftBuffer[leftBufferOffset + 4]

  const b1 = rightBuffer[rightBufferOffset + 0]
  const b2 = rightBuffer[rightBufferOffset + 1]
  const b3 = rightBuffer[rightBufferOffset + 2]
  const b4 = rightBuffer[rightBufferOffset + 3]
  const b5 = rightBuffer[rightBufferOffset + 4]

  resultBuffer[resultBufferOffset + 0] = a1 + b1
  resultBuffer[resultBufferOffset + 1] = a2 + b2
  resultBuffer[resultBufferOffset + 2] = a3 + b3
  resultBuffer[resultBufferOffset + 3] = a4 + b4
  resultBuffer[resultBufferOffset + 4] = a5 + b5
}

describe('some test', function () {
  it('benchmark', function () {
    const suite = new Benchmark.Suite()
    const arrays = []

    for (let index = 0; index < 20; ++index) {
      arrays.push(new Float32Array(5))
    }

    suite.add('add', function () {
      for (let index = 0; index < 18; ++index) {
        add(arrays[index], arrays[index + 1], arrays[index + 2], 5)
      }
    }).add('add5', function () {
      for (let index = 0; index < 18; ++index) {
        add5(arrays[index], arrays[index + 1], arrays[index + 2])
      }
    }).add('add5s', function () {
      for (let index = 0; index < 18; ++index) {
        add5s(arrays[index], arrays[index + 1], arrays[index + 2])
      }
    }).on('cycle', function(event) {
      console.log(String(event.target));
    }).on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    }).run()
  })

  it('benchmark', function () {
    const suite = new Benchmark.Suite()
    const arrays = []

    for (let index = 0; index < 20; ++index) {
      arrays.push(new Float32Array(5))
    }

    suite.add('add5so', function () {
      for (let index = 0; index < 18; ++index) {
        add5so(arrays[index], arrays[index + 1], arrays[index + 2], 0, 0, 0)
      }
    }).add('add5sop', function () {
      for (let index = 0; index < 18; ++index) {
        add5sop(arrays[index], arrays[index + 1], arrays[index + 2], 0, 0, 0)
      }
    }).add('add5sopw', function () {
      for (let index = 0; index < 18; ++index) {
        add5sop(arrays[index], arrays[index + 1], arrays[index + 2])
      }
    }).on('cycle', function(event) {
      console.log(String(event.target));
    }).on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    }).run()
  })

  it('benchmark', function () {
    const suite = new Benchmark.Suite()
    const arrays = []

    for (let index = 0; index < 40; ++index) {
      if (Math.floor(index / 3) % 2 == 0) {
        arrays.push(new Float32Array(5))
      } else {
        arrays.push(new Int32Array(5))
      }
    }

    suite.add('add5s', function () {
      for (let index = 0; index < 40 - 2; index += 3) {
        add5s(arrays[index], arrays[index + 1], arrays[index + 2])
      }
    }).on('cycle', function(event) {
      console.log(String(event.target));
    }).on('complete', function() {
      console.log('Fastest is ' + this.filter('fastest').map('name'));
    }).run()
  })
})
