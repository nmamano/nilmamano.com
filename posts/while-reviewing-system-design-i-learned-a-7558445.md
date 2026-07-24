---
date: '2026-01-23'
timestamp: '2026-01-23T17:46:01.000Z'
source: both
linkedinUrl: 'https://www.linkedin.com/feed/update/urn:li:share:7420521543274897408'
status: published
xUrl: 'https://x.com/Nil053/status/2014756521897558445'
tweetId: '2014756521897558445'
segments: 1
images: []
tags:
  - job-search
---
While reviewing system design, I learned a new concept! Presigned URLs.

Let's say you build an app where users upload large files, like videos.

It's more efficient to store such files in a blob storage (like AWS S3), not a traditional database.

The question is, when a user uploads a video, how does it get to the blob storage?

Like in the case of a normal database, only YOUR server has the credentials to write to the blob storage, so the traditional path for uploading a video would be:

User client -> Server -> Blob storage

However, many large files going through your server could become the bandwidth bottleneck.

Presigned URLs are a shortcut so the user can write directly to blob storage.

How it works:

1. The client tells the server they want to upload a file to blob storage.

2. The server works out all the logic for where the file should go, client authorization, and so on.

3. If everything checks out, the server takes all the metadata it would itself need to write the file to blob storage, puts it in a string, and uses a secret access key, `secret_key`, shared between the server and the blob storage to create a cryptographic signature for the string:

sig = signature(metadata, secret_key).

4. The server constructs a "presigned URL" with the metadata + the signature and returns it to the client:

make_presigned_url(metadata, sig).

5. The client uses the metadata in the URL, including the signature to upload the file to blob storage.

6. The blob storage uses the secret access key to recompute what the signature should be for the received metadata, and verifies that it matches the attached signature (sig):

signature(metadata, secret_key) == sig

This tells the blob storage that (1) the attached signature was created using the secret access key that only the server and the blob storage know, and (2) that the client didn't manipulate any of the metadata. If everything checks out, the file is uploaded.
