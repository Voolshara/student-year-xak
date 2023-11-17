import { Get, Route } from "tsoa";

interface PingResponse {
  message: string;
  status: string;
}

@Route("/api")
class PingController {
  /**
   * Проверка статуса сервера
   */
  @Get("/ping")
  public async getMessage(): Promise<PingResponse> {
    return {
      message: "hello",
      status: "ok",
    };
  }
}

export default PingController;
