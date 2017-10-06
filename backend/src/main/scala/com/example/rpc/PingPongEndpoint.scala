package com.example.rpc

import java.util.concurrent.TimeUnit

import scala.concurrent.Future

class PingPongEndpoint extends PingPongServerRPC {
  override def fPing(id: Int): Future[Int] = {
    TimeUnit.SECONDS.sleep(1)
    Future.successful(id)
  }
}
