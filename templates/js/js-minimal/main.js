// Reading the input JSON
const input = readInput();

// Processing the input to create an output
const x = input.x;
const result = 2*x;

const output = {
    "result": result
}

// Writing the output JSON
writeOutput(output);



// Helper functions for IO
function readInput() {
    const chunkSize = 1024;
    const inputChunks = [];
    let totalBytes = 0;

    // Read all the available bytes
    while (1) {
        const buffer = new Uint8Array(chunkSize);
        // Stdin file descriptor
        const fd = 0;
        const bytesRead = Javy.IO.readSync(fd, buffer);

        totalBytes += bytesRead;
        if (bytesRead === 0) {
            break;
        }
        inputChunks.push(buffer.subarray(0, bytesRead));
    }

    // Assemble input into a single Uint8Array
    const { finalBuffer } = inputChunks.reduce((context, chunk) => {
        context.finalBuffer.set(chunk, context.bufferOffset);
        context.bufferOffset += chunk.length;
        return context;
    }, { bufferOffset: 0, finalBuffer: new Uint8Array(totalBytes) });

    return JSON.parse(new TextDecoder().decode(finalBuffer));
}

function writeOutput(output) {
    const encodedOutput = new TextEncoder().encode(JSON.stringify(output));
    const buffer = new Uint8Array(encodedOutput);
    // Stdout file descriptor
    const fd = 1;
    Javy.IO.writeSync(fd, buffer);
}
