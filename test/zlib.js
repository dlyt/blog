const zlib = require('zlib');

/// Test with small write (< chunk size -> needDrain == false), works as expected
// Create streams
const zipper1 = zlib.createGzip();
const unzipper1 = zlib.createGunzip();
zipper1.pipe(unzipper1);

// Write to stream
zipper1.write('some small data');

// Attempt to flush stream
zipper1.flush();

// Check output
unzipper1.on('data', (d) => {
	console.log('zipper1: Short data flush received ' + d.length + ' bytes');
});


/// Test with large write
// Create streams
const zipper2 = zlib.createGzip();
const unzipper2 = zlib.createGunzip();
zipper2.pipe(unzipper2);

// Write to stream
zipper2.write('A'.repeat(17000));

// Attempt to flush stream
zipper2.flush();

// Check output
unzipper2.on('data', (d) => {
	console.log('zipper2: Long data flush received ' + d.length + ' bytes');
});


/// Test with large write and callback on flush, works as expected
// Create streams
const zipper3 = zlib.createGzip();
const unzipper3 = zlib.createGunzip();
zipper3.pipe(unzipper3);

// Write to stream
zipper3.write('A'.repeat(17000));

// Attempt to flush stream
zipper3.flush(() => {});

// Check output
unzipper3.on('data', (d) => {
	console.log('zipper3: Long data flush with callback received ' + d.length + ' bytes');
});