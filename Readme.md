# Clean Blog
A blog community for write yourself.

## Dependencies
1. Scala.js and Scala full stack
2. Udash RPC framework
3. Bootstrap web UI framework

## How to deploy
1. package: `sbt frontend/compile backend/assembly`
2. run: `java -jar path/xxx.jar`

PS: localhost:8080 by default

## How to develop
1. open one sbt window with `sbt "project frontend" ~compile` which auto compile frontend code if changed
2. open second sbt window with `sbt ~backend/reStart` which restart server if backend code changed
