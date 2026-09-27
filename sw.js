// Service worker mínimo, usado apenas para exibir a notificação fixa de contagem
// do turno (Ponto) enquanto o celular está bloqueado. Não faz cache nem controla
// requisições — é só o "canal" que o Chrome no Android exige para notificações.

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((lista) => {
      for (const cliente of lista) {
        if ('focus' in cliente) return cliente.focus();
      }
      if (self.clients.openWindow) return self.clients.openWindow('.');
    })
  );
});
