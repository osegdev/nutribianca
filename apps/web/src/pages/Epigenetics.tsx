import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero, PlanCard, Steps, FAQ, Button } from '@nutribianca/ui';
import epigeneticsData from '../data/epigenetics.json';
import { Navigation } from '../components/Navigation';

export const Epigenetics: React.FC = () => {
  const { plans, faqs, steps, testimonials } = epigeneticsData;

  return (
    <>
      <Helmet>
        <title>Pruebas Epigenéticas | NutriBianca - Nutrición Personalizada</title>
        <meta
          name="description"
          content="Descubre qué dice tu epigenética sobre tu salud. Prueba no invasiva a partir de cabello, resultados en 7 días. Disponible en Santa Rosa de Copán y online."
        />
        <meta
          name="keywords"
          content="epigenética, nutrición personalizada, pruebas cabello, Santa Rosa de Copán, Honduras"
        />

        {/* Open Graph */}
        <meta property="og:title" content="Pruebas Epigenéticas | NutriBianca" />
        <meta
          property="og:description"
          content="Descubre qué dice tu epigenética sobre tu salud. Prueba no invasiva a partir de cabello, resultados en 7 días."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://nutribianca.com/epigenetica" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Pruebas Epigenéticas | NutriBianca" />
        <meta
          name="twitter:description"
          content="Descubre qué dice tu epigenética sobre tu salud. Prueba no invasiva a partir de cabello, resultados en 7 días."
        />
      </Helmet>

      <Navigation />

      {/* Hero Section */}
      <Hero
        headline="Descubre qué dice tu epigenética sobre tu salud"
        subheadline="Prueba no invasiva a partir de cabello, resultados en 7 días."
        tagline="Complemento científico a tu plan nutricional"
        ctaText="Consultar vía WhatsApp"
        ctaHref="https://wa.me/50432177256"
        className="bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-50"
      />

      {/* Benefits Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              ¿Por qué elegir nuestras pruebas epigenéticas?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Tu perfil epigenético único revela cómo tu cuerpo procesa nutrientes, metaboliza
              grasas y responde al estrés.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧬</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Personalización Científica</h3>
              <p className="text-neutral-600 text-sm">
                Cada cuerpo es único. Tu epigenética revela exactamente qué necesitas.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✂️</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">No Invasivo</h3>
              <p className="text-neutral-600 text-sm">
                Solo una muestra de cabello desde la comodidad de tu hogar.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Resultados Rápidos</h3>
              <p className="text-neutral-600 text-sm">
                Análisis completo en laboratorio certificado, resultados en 7 días.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="font-bold text-neutral-900 mb-2">Complemento Nutricional</h3>
              <p className="text-neutral-600 text-sm">
                Se integra perfectamente con tu consulta nutricional clínica.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <Steps steps={steps} title="¿Cómo funciona?" subtitle="Proceso simple en 3 pasos" />

      {/* Plans Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Elige tu plan epigenético
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Ofrecemos diferentes niveles de análisis según tus necesidades y objetivos de salud.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map(plan => (
              <PlanCard
                key={plan.id}
                title={plan.title}
                subtitle={plan.subtitle}
                price={plan.price}
                originalPrice={plan.originalPrice}
                description={plan.description}
                features={plan.features}
                popular={plan.popular}
                ctaText={plan.cta}
                ctaHref="https://wa.me/50432177256"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Lo que dicen nuestros pacientes
            </h2>
            <p className="text-lg text-neutral-600">
              Testimonios reales de personas que transformaron su salud con epigenética
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map(testimonial => (
              <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <div className="flex text-secondary-400 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-lg">
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="text-neutral-700 italic mb-4">"{testimonial.testimonial}"</p>
                </div>
                <div className="border-t pt-4">
                  <p className="font-bold text-neutral-900">
                    {testimonial.name}, {testimonial.age} años
                  </p>
                  <p className="text-sm text-neutral-600">{testimonial.location}</p>
                  <p className="text-sm text-primary-600 font-medium">Plan {testimonial.plan}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        faqs={faqs}
        title="Preguntas Frecuentes"
        subtitle="Resuelve tus dudas sobre las pruebas epigenéticas"
      />

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            ¿Listo para descubrir tu perfil epigenético único?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Agenda tu consulta inicial y conoce cómo la epigenética puede transformar tu salud desde
            la raíz.
          </p>
          <Button
            href="https://wa.me/50432177256"
            variant="secondary"
            size="lg"
            className="text-lg px-8 py-4"
          >
            Consultar vía WhatsApp
          </Button>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-8 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm text-neutral-600">
            <strong>Importante:</strong> La prueba epigenética es un complemento nutricional y no
            sustituye el diagnóstico médico profesional. Los resultados deben interpretarse junto
            con un profesional de la nutrición calificado.
          </p>
          <p className="text-sm text-neutral-600 mt-2">
            <strong>Disponibilidad:</strong> Servicio disponible en Santa Rosa de Copán y modalidad
            online para todo Honduras y Centroamérica.
          </p>
        </div>
      </section>
    </>
  );
};

export default Epigenetics;
