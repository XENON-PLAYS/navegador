from datetime import datetime
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path


ERROR_LOG = Path("server-errors.log")


class CrossOriginIsolatedHandler(SimpleHTTPRequestHandler):
    extensions_map = {
        **SimpleHTTPRequestHandler.extensions_map,
        ".js": "text/javascript",
        ".wasm": "application/wasm",
    }

    def send_error(self, code, message=None, explain=None):
        if code >= 400:
            with ERROR_LOG.open("a", encoding="utf-8") as log:
                timestamp = datetime.now().isoformat(timespec="seconds")
                log.write(f"{timestamp}\t{code}\t{self.command}\t{self.path}\n")
        super().send_error(code, message, explain)

    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Cross-Origin-Resource-Policy", "same-origin")
        if self.path.startswith("/data/"):
            self.send_header("Cache-Control", "public, max-age=86400")
        elif self.path.endswith((".wasm", ".png", ".ico")):
            self.send_header("Cache-Control", "public, max-age=86400")
        else:
            self.send_header("Cache-Control", "no-cache, must-revalidate")
        super().end_headers()


if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8000), CrossOriginIsolatedHandler)
    print("Jogo disponível em http://127.0.0.1:8000/")
    server.serve_forever()
