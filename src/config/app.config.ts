export const EnvConfiguration = () => ({
  environment: process.env.NODE_ENV || 'dev',
  mongodb: process.env.MONGODB,
  // esto es useless ya que el sitio donde se usa es no es un modulo de nest por lo que queda fuera del alcance de la inyección de dependencias
  port: process.env.PORT || 3002,
  //importante si es un valor numerico se debe de hacer la conversion en numero por si el default limit viene de otro lado como algo que no sea un numero
  default_limit: +process.env.DEFAULT_LIMIT || 7,
});
