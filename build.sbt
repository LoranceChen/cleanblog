//import com.lihaoyi.workbench.Plugin._
import UdashBuild._
import Dependencies._

name := "blogchan3"

version in ThisBuild := "0.1.0-SNAPSHOT"
scalaVersion in ThisBuild := "2.12.2"
organization in ThisBuild := "com.example"
crossPaths in ThisBuild := false
scalacOptions in ThisBuild ++= Seq(
  "-feature",
  "-deprecation",
  "-unchecked",
  "-language:implicitConversions",
  "-language:existentials",
  "-language:dynamics",
  "-Xfuture",
  "-Xfatal-warnings",
  "-Xlint:-unused,_"
)

def crossLibs(configuration: Configuration) =
  libraryDependencies ++= crossDeps.value.map(_ % configuration)

lazy val blogchan3 = project.in(file("."))
  .aggregate(sharedJS, sharedJVM, frontend, backend)
  .dependsOn(backend)
  .settings(
    publishArtifact := false,
    mainClass in Compile := Some("com.example.Launcher")
  )
  .settings(
    mainClass in assembly := Some("com.example.Launcher"),
    aggregate in assembly := false
  )
  .settings(
    mainClass in reStart := Some("com.example.Launcher"),
    aggregate in reStart := false
  )

lazy val shared = crossProject.crossType(CrossType.Pure).in(file("shared"))
  .settings(
    crossLibs(Provided)
  )

lazy val sharedJVM = shared.jvm
lazy val sharedJS = shared.js

lazy val backend = (project in file("backend"))
  .dependsOn(sharedJVM)
  .settings(
    libraryDependencies ++= backendDeps.value,
    crossLibs(Compile),

    mappings in (Compile, packageBin) ++= {
      ((target in (Compile)).value / StaticFilesDir).***.get map { file =>
        file -> file.getAbsolutePath.stripPrefix((target in Compile).value.getAbsolutePath)
      }
    }
  )

lazy val frontend = (project in file("./frontend")).enablePlugins(ScalaJSPlugin).
  dependsOn(sharedJS).
  settings(
    watchSources += (sourceDirectory.value / "main/assets")
  ).
  settings(
    libraryDependencies ++= frontendDeps.value,
    crossLibs(Compile),
    jsDependencies ++= frontendJSDeps.value,
    scalaJSUseMainModuleInitializer in Compile := true,

    compile := (compile in Compile).dependsOn(compileStatics).value,
    compileStatics := {
      IO.copyDirectory(sourceDirectory.value / "main/assets", crossTarget.value / StaticFilesDir / WebContent / "assets")
      val static = compileStaticsForRelease.value
      (crossTarget.value / StaticFilesDir).***.get
    },

    artifactPath in(Compile, fastOptJS) :=
      (crossTarget in(Compile, fastOptJS)).value / StaticFilesDir / WebContent / "scripts" / "frontend-impl-fast.js",
    artifactPath in(Compile, fullOptJS) :=
      (crossTarget in(Compile, fullOptJS)).value / StaticFilesDir / WebContent / "scripts" / "frontend-impl.js",
    artifactPath in(Compile, packageJSDependencies) :=
      (crossTarget in(Compile, packageJSDependencies)).value / StaticFilesDir / WebContent / "scripts" / "frontend-deps-fast.js",
    artifactPath in(Compile, packageMinifiedJSDependencies) :=
      (crossTarget in(Compile, packageMinifiedJSDependencies)).value / StaticFilesDir / WebContent / "scripts" / "frontend-deps.js"
  )


cancelable in Global := true //Ctrl+C to cancel