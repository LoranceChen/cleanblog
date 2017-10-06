package com.example

import com.example.jetty.ApplicationServer

object Launcher {
  def main(args: Array[String]): Unit = {
    val server = new ApplicationServer(8080, "frontend/target/UdashStatic/WebContent")
    server.start()

  }
}
