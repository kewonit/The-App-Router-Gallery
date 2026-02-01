export async function GET() {
  return Response.json({
    message: 'Hello from Route Handler!',
    timestamp: new Date().toISOString(),
    method: 'GET',
  });
}

export async function POST(request: Request) {
  const body = await request.json();

  return Response.json({
    received: body,
    processed: true,
    serverTime: new Date().toISOString(),
    method: 'POST',
  });
}
