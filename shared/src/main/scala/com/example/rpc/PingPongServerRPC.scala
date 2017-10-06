package com.example.rpc

import io.udash.rpc._

import scala.concurrent.Future

@RPC
trait PingPongServerRPC {
  def fPing(id: Int): Future[Int]
}