import React, { useState } from 'react'
import './App.css'

// Tipos para el formulario (como un "contrato" de qué datos vamos a manejar)
interface FormData {
  // Información personal
  nombre: string
  email: string
  telefono: string
  ubicacion: string
  
  // Información del negocio
  nombreNegocio: string
  tipoNegocio: string
  descripcionNegocio: string
  publicoObjetivo: string
  experienciaWeb: string
  
  // Objetivos y necesidades
  objetivoPrincipal: string
  objetivosSecundarios: string[]
  presupuesto: string
  tiempoEntrega: string
  
  // Contenido y branding
  mensajePrincipal: string
  tonoComunicacion: string
  coloresPreferidos: string[]
  estiloDiseno: string
  
  // Imágenes y assets
  logo: File | null
  imagenes: File[]
  referencias: string[]
  
  // Información adicional
  comentariosAdicionales: string
  comoConociste: string
}

function App() {
  // Estado del formulario (como la "memoria" del formulario)
  const [formData, setFormData] = useState<FormData>({
    nombre: '',
    email: '',
    telefono: '',
    ubicacion: '',
    nombreNegocio: '',
    tipoNegocio: '',
    descripcionNegocio: '',
    publicoObjetivo: '',
    experienciaWeb: '',
    objetivoPrincipal: '',
    objetivosSecundarios: [],
    presupuesto: '',
    tiempoEntrega: '',
    mensajePrincipal: '',
    tonoComunicacion: '',
    coloresPreferidos: [],
    estiloDiseno: '',
    logo: null,
    imagenes: [],
    referencias: [],
    comentariosAdicionales: '',
    comoConociste: ''
  })

  // Estado para controlar qué sección del formulario está activa
  const [currentStep, setCurrentStep] = useState(1)
  
  // Estado para mensajes de confirmación de archivos
  const [uploadMessages, setUploadMessages] = useState<{[key: string]: string}>({})
  const totalSteps = 6

  // Función para actualizar los datos del formulario
  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Función para manejar la subida de archivos
  const handleFileUpload = (field: 'logo' | 'imagenes', files: FileList | null) => {
    if (!files) return
    
    if (field === 'logo') {
      updateFormData('logo', files[0])
      // Mostrar mensaje de confirmación para logo
      setUploadMessages(prev => ({
        ...prev,
        logo: `✅ Logo "${files[0].name}" subido correctamente`
      }))
    } else {
      updateFormData('imagenes', Array.from(files))
      // Mostrar mensaje de confirmación para imágenes
      setUploadMessages(prev => ({
        ...prev,
        imagenes: `✅ ${files.length} imagen(es) subida(s) correctamente`
      }))
    }
    
    // Limpiar mensaje después de 3 segundos
    setTimeout(() => {
      setUploadMessages(prev => ({
        ...prev,
        [field]: ''
      }))
    }, 3000)
  }

  // Función para validar el formulario
  const validateForm = () => {
    const errors: string[] = []
    
    if (!formData.nombre.trim()) errors.push('El nombre es requerido')
    if (!formData.email.trim()) errors.push('El email es requerido')
    if (!formData.nombreNegocio.trim()) errors.push('El nombre del negocio es requerido')
    if (!formData.descripcionNegocio.trim()) errors.push('La descripción del negocio es requerida')
    if (!formData.publicoObjetivo.trim()) errors.push('El público objetivo es requerido')
    if (!formData.objetivoPrincipal) errors.push('El objetivo principal es requerido')
    if (!formData.mensajePrincipal.trim()) errors.push('El mensaje principal es requerido')
    
    return errors
  }

  // Función para validar antes del envío
  const handleSubmit = (e: React.FormEvent) => {
    const errors = validateForm()
    if (errors.length > 0) {
      e.preventDefault() // Solo prevenir si hay errores
      alert('Por favor completa los campos requeridos:\n' + errors.join('\n'))
      return
    }
    
    // Si no hay errores, permitir el envío a Formspree
    console.log('Enviando formulario a Formspree...')
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #e0e7ff 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      {/* Fondo decorativo sutil */}
      <div style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        pointerEvents: 'none'
      }}>
        <div style={{
          position: 'absolute',
          top: '5rem',
          left: '5rem',
          width: '8rem',
          height: '8rem',
          background: 'rgba(59, 130, 246, 0.3)',
          borderRadius: '50%',
          filter: 'blur(3rem)'
        }}></div>
        <div style={{
          position: 'absolute',
          bottom: '5rem',
          right: '5rem',
          width: '10rem',
          height: '10rem',
          background: 'rgba(99, 102, 241, 0.3)',
          borderRadius: '50%',
          filter: 'blur(3rem)'
        }}></div>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '15rem',
          height: '15rem',
          background: 'rgba(148, 163, 184, 0.2)',
          borderRadius: '50%',
          filter: 'blur(3rem)'
        }}></div>
      </div>

      {/* Formulario como pop-up elegante */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '42rem'
      }}>
        {/* Contenedor principal del formulario */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '1.5rem',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem'
        }}>
          {/* Header minimalista */}
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: 'bold',
              color: '#111827',
              marginBottom: '1rem',
              lineHeight: 1.2
            }}>
              Brief Creativo
            </h1>
            <p style={{
              fontSize: '1.125rem',
              color: '#6b7280',
              maxWidth: '32rem',
              margin: '0 auto'
            }}>
              Cuéntame sobre tu proyecto para crear tu web a medida
            </p>
          </div>

          {/* Barra de progreso minimalista */}
          <div style={{ marginBottom: '2rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#6b7280'
              }}>
                Paso {currentStep} de {totalSteps}
              </span>
              <span style={{
                fontSize: '0.875rem',
                color: '#9ca3af'
              }}>
                {Math.round((currentStep / totalSteps) * 100)}%
              </span>
            </div>
            <div style={{
              width: '100%',
              background: '#e5e7eb',
              borderRadius: '9999px',
              height: '0.5rem'
            }}>
              <div 
                style={{
                  background: 'linear-gradient(90deg, #3b82f6 0%, #4f46e5 100%)',
                  height: '0.5rem',
                  borderRadius: '9999px',
                  transition: 'width 0.5s ease',
                  width: `${(currentStep / totalSteps) * 100}%`
                }}
              ></div>
            </div>
          </div>

          {/* Formulario */}
          <form 
            action="https://formspree.io/f/xnngvyjl" 
            method="POST" 
            encType="multipart/form-data"
            onSubmit={handleSubmit} 
            style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}
          >
            
            {/* Paso 1: Información Personal */}
            {currentStep === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#111827',
                    marginBottom: '0.5rem'
                  }}>
                    Información Personal
                  </h2>
                  <p style={{
                    color: '#6b7280',
                    marginBottom: '1.5rem'
                  }}>
                    Datos básicos para personalizar tu experiencia
                  </p>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      required
                      value={formData.nombre}
                      onChange={(e) => updateFormData('nombre', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => updateFormData('email', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '1rem 1.25rem',
                        border: '2px solid #e5e7eb',
                        borderRadius: '1rem',
                        fontSize: '1rem',
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        transition: 'all 0.3s ease',
                        outline: 'none',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                      }}
                      onFocus={(e) => {
                        e.target.style.borderColor = '#3b82f6';
                        e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                        e.target.style.transform = 'translateY(-2px)';
                      }}
                      onBlur={(e) => {
                        e.target.style.borderColor = '#e5e7eb';
                        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                        e.target.style.transform = 'translateY(0)';
                      }}
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      name="telefono"
                      value={formData.telefono}
                      onChange={(e) => updateFormData('telefono', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div>
                    <label style={{
                      display: 'block',
                      fontSize: '0.875rem',
                      fontWeight: '500',
                      color: '#374151',
                      marginBottom: '0.5rem'
                    }}>
                      Ubicación
                    </label>
                    <input
                      type="text"
                      name="ubicacion"
                      value={formData.ubicacion}
                      onChange={(e) => updateFormData('ubicacion', e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #d1d5db',
                        borderRadius: '0.5rem',
                        fontSize: '1rem',
                        transition: 'all 0.2s ease'
                      }}
                      placeholder="Ciudad, País"
                    />
                  </div>
                </div>
              </div>
            )}

          {/* Paso 2: Información del Negocio */}
          {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Información del Negocio</h2>
                  <p className="text-gray-600 mb-6">Ayúdanos a entender tu negocio y tu audiencia</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre de tu negocio *
                    </label>
                <input
                  type="text"
                  name="nombreNegocio"
                  required
                  value={formData.nombreNegocio}
                  onChange={(e) => updateFormData('nombreNegocio', e.target.value)}
                  placeholder="El nombre de tu empresa o marca personal"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de negocio *
                    </label>
                <select
                  name="tipoNegocio"
                  required
                  value={formData.tipoNegocio}
                  onChange={(e) => updateFormData('tipoNegocio', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="coach">Coach/Consultora</option>
                  <option value="psicologa">Psicóloga</option>
                  <option value="emprendedora">Emprendedora Digital</option>
                  <option value="servicios">Servicios Profesionales</option>
                  <option value="productos">Venta de Productos</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Describe tu negocio *
                    </label>
                <textarea
                  name="descripcionNegocio"
                  required
                  rows={3}
                  value={formData.descripcionNegocio}
                  onChange={(e) => updateFormData('descripcionNegocio', e.target.value)}
                  placeholder="¿Qué haces? ¿Cómo ayudas a tus clientes? ¿Qué te hace único?"
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Quién es tu público objetivo? *
                    </label>
                <textarea
                  name="publicoObjetivo"
                  required
                  rows={3}
                  value={formData.publicoObjetivo}
                  onChange={(e) => updateFormData('publicoObjetivo', e.target.value)}
                  placeholder="Describe a tu cliente ideal: edad, género, intereses, problemas que tienen..."
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                />
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ¿Tienes experiencia con sitios web?
                    </label>
                <select
                  name="experienciaWeb"
                  value={formData.experienciaWeb}
                  onChange={(e) => updateFormData('experienciaWeb', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="nada">Ninguna experiencia</option>
                  <option value="basica">Experiencia básica</option>
                  <option value="intermedia">Experiencia intermedia</option>
                  <option value="avanzada">Experiencia avanzada</option>
                </select>
                  </div>
              </div>
            </div>
          )}

          {/* Paso 3: Objetivos y Necesidades */}
          {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tus objetivos</h2>
                  <p className="text-gray-600 mb-6">¿Qué quieres lograr con tu landing page?</p>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Objetivo principal *
                    </label>
                <select
                  name="objetivoPrincipal"
                  required
                  value={formData.objetivoPrincipal}
                  onChange={(e) => updateFormData('objetivoPrincipal', e.target.value)}
                  style={{
                    width: '100%',
                    padding: '1rem 1.25rem',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    fontSize: '1rem',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    outline: 'none',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                    e.target.style.transform = 'translateY(-2px)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                    e.target.style.transform = 'translateY(0)';
                  }}
                >
                  <option value="">Selecciona tu objetivo principal</option>
                  <option value="leads">Generar leads/clientes potenciales</option>
                  <option value="ventas">Vender productos/servicios</option>
                  <option value="marca">Construir marca personal</option>
                  <option value="credibilidad">Aumentar credibilidad</option>
                  <option value="comunidad">Crear comunidad</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Objetivos secundarios (puedes seleccionar varios)
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                  {[
                    'Generar más tráfico',
                    'Aumentar conversiones',
                    'Mejorar SEO',
                    'Mostrar portfolio',
                    'Recopilar emails',
                    'Vender online',
                    'Construir autoridad',
                    'Crear comunidad'
                  ].map((objetivo) => (
                        <label key={objetivo} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.objetivosSecundarios.includes(objetivo)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            updateFormData('objetivosSecundarios', [...formData.objetivosSecundarios, objetivo])
                          } else {
                            updateFormData('objetivosSecundarios', formData.objetivosSecundarios.filter(o => o !== objetivo))
                          }
                        }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                          <span className="text-sm text-gray-700">{objetivo}</span>
                        </label>
                  ))}
                </div>
              </div>
              
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tiempo de entrega deseado
                    </label>
                <select
                  value={formData.tiempoEntrega}
                  onChange={(e) => updateFormData('tiempoEntrega', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                >
                  <option value="">Selecciona un tiempo</option>
                  <option value="urgente">Urgente (1-2 semanas)</option>
                  <option value="1-mes">1 mes</option>
                  <option value="2-meses">2 meses</option>
                  <option value="3-meses">3 meses</option>
                  <option value="flexible">Soy flexible</option>
                </select>
                  </div>
              </div>
            </div>
          )}

          {/* Paso 4: Contenido y Branding */}
          {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu estilo y contenido</h2>
                  <p className="text-gray-600 mb-6">Ayúdanos a crear algo que te represente perfectamente</p>
                </div>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cuál es tu mensaje principal? *
                  </label>
                  <textarea
                    name="mensajePrincipal"
                    required
                    rows={3}
                    value={formData.mensajePrincipal}
                    onChange={(e) => updateFormData('mensajePrincipal', e.target.value)}
                    placeholder="¿Qué quieres que la gente sepa sobre ti en 30 segundos?"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo te gusta comunicarte?
                  </label>
                  <select
                    name="tonoComunicacion"
                    value={formData.tonoComunicacion}
                    onChange={(e) => updateFormData('tonoComunicacion', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <option value="">Selecciona un tono</option>
                    <option value="profesional">Profesional y formal</option>
                    <option value="cercano">Cercano y amigable</option>
                    <option value="empoderador">Empoderador e inspirador</option>
                    <option value="relajado">Relajado y casual</option>
                    <option value="autoridad">De autoridad y experto</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Colores que te gustan (puedes seleccionar varios)
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { name: 'Rosa', value: 'rosa', color: 'bg-pink-400' },
                      { name: 'Lila', value: 'lila', color: 'bg-purple-400' },
                      { name: 'Mint', value: 'mint', color: 'bg-green-400' },
                      { name: 'Azul', value: 'azul', color: 'bg-blue-400' },
                      { name: 'Coral', value: 'coral', color: 'bg-orange-400' },
                      { name: 'Neutro', value: 'neutro', color: 'bg-gray-400' }
                    ].map((color) => (
                      <label key={color.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={formData.coloresPreferidos.includes(color.value)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              updateFormData('coloresPreferidos', [...formData.coloresPreferidos, color.value])
                            } else {
                              updateFormData('coloresPreferidos', formData.coloresPreferidos.filter(c => c !== color.value))
                            }
                          }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <div className={`w-4 h-4 rounded-full ${color.color}`}></div>
                        <span className="text-sm">{color.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estilo de diseño que prefieres
                  </label>
                  <select
                    value={formData.estiloDiseno}
                    onChange={(e) => updateFormData('estiloDiseno', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  >
                    <option value="">Selecciona un estilo</option>
                    <option value="minimalista">Minimalista y limpio</option>
                    <option value="moderno">Moderno y elegante</option>
                    <option value="femenino">Femenino y suave</option>
                    <option value="profesional">Profesional y corporativo</option>
                    <option value="creativo">Creativo y artístico</option>
                    <option value="vintage">Vintage y retro</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Paso 5: Imágenes y Assets */}
          {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Tus imágenes y assets</h2>
                  <p className="text-gray-600 mb-6">Sube tus imágenes para que podamos crear algo increíble</p>
                </div>
                
                <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Logo de tu negocio
                  </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      name="logo"
                      accept="image/*"
                      onChange={(e) => handleFileUpload('logo', e.target.files)}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                        <div className="text-2xl mb-2">📁</div>
                      <p className="text-sm text-gray-600">
                        {formData.logo ? formData.logo.name : 'Haz clic para subir tu logo'}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG o SVG (máx. 5MB)
                      </p>
                    </label>
                  </div>
                  {/* Mensaje de confirmación para logo */}
                  {uploadMessages.logo && (
                    <div style={{
                      marginTop: '0.5rem',
                      padding: '0.5rem',
                      backgroundColor: '#d1fae5',
                      border: '1px solid #10b981',
                      borderRadius: '0.5rem',
                      fontSize: '0.875rem',
                      color: '#065f46',
                      textAlign: 'center'
                    }}>
                      {uploadMessages.logo}
                    </div>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                      Imágenes adicionales
                  </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      name="imagenes"
                      accept="image/*"
                      multiple
                      onChange={(e) => handleFileUpload('imagenes', e.target.files)}
                      className="hidden"
                      id="images-upload"
                    />
                    <label htmlFor="images-upload" className="cursor-pointer">
                        <div className="text-2xl mb-2">🖼️</div>
                      <p className="text-sm text-gray-600">
                        {formData.imagenes.length > 0 
                          ? `${formData.imagenes.length} imagen(es) seleccionada(s)` 
                          : 'Haz clic para subir imágenes'
                        }
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG (máx. 5MB cada una)
                      </p>
                    </label>
                    </div>
                    {/* Mensaje de confirmación para imágenes */}
                    {uploadMessages.imagenes && (
                      <div style={{
                        marginTop: '0.5rem',
                        padding: '0.5rem',
                        backgroundColor: '#d1fae5',
                        border: '1px solid #10b981',
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        color: '#065f46',
                        textAlign: 'center'
                      }}>
                        {uploadMessages.imagenes}
                      </div>
                    )}
                  </div>
                  
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Referencias de diseño (URLs de sitios que te gustan)
                  </label>
                  <textarea
                    name="referencias"
                    rows={3}
                    value={formData.referencias.join('\n')}
                    onChange={(e) => updateFormData('referencias', e.target.value.split('\n').filter(url => url.trim()))}
                    placeholder="https://ejemplo.com&#10;https://otro-ejemplo.com"
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Una URL por línea
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Paso 6: Información Adicional */}
          {currentStep === 6 && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Información adicional</h2>
                  <p className="text-gray-600 mb-6">Cualquier cosa que quieras que sepamos</p>
                </div>
                
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    ¿Cómo nos conociste?
                  </label>
                  <select
                    name="comoConociste"
                    value={formData.comoConociste}
                    onChange={(e) => updateFormData('comoConociste', e.target.value)}
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="tiktok">TikTok</option>
                    <option value="recomendacion">Recomendación</option>
                    <option value="google">Google</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
                
      <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios adicionales
                  </label>
                  <textarea
                    name="comentariosAdicionales"
                    rows={4}
                    value={formData.comentariosAdicionales}
                    onChange={(e) => updateFormData('comentariosAdicionales', e.target.value)}
                    placeholder="¿Hay algo más que quieras contarnos? Ideas, preocupaciones, preguntas..."
                    style={{
                      width: '100%',
                      padding: '1rem 1.25rem',
                      border: '2px solid #e5e7eb',
                      borderRadius: '1rem',
                      fontSize: '1rem',
                      background: 'rgba(255, 255, 255, 0.8)',
                      backdropFilter: 'blur(10px)',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
                      resize: 'vertical'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#3b82f6';
                      e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  />
                </div>
                
                {/* Resumen del formulario */}
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h3 className="font-bold text-lg mb-4">Resumen de tu consulta</h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Nombre:</strong> {formData.nombre}</p>
                    <p><strong>Negocio:</strong> {formData.nombreNegocio}</p>
                    <p><strong>Objetivo:</strong> {formData.objetivoPrincipal}</p>
                    <p><strong>Imágenes:</strong> {formData.imagenes.length} subidas</p>
                    </div>
                </div>
              </div>
      </div>
          )}

            {/* Botones de navegación */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '2rem'
            }}>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  style={{
                    padding: '1rem 2rem',
                    color: '#6b7280',
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: '2px solid #e5e7eb',
                    borderRadius: '1rem',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.color = '#374151';
                    e.target.style.borderColor = '#3b82f6';
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.color = '#6b7280';
                    e.target.style.borderColor = '#e5e7eb';
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
                  }}
                >
                  ← Anterior
                </button>
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep(currentStep + 1)}
                  style={{
                    marginLeft: 'auto',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
                  }}
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  type="submit"
                  style={{
                    marginLeft: 'auto',
                    background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                    color: 'white',
                    padding: '1rem 2.5rem',
                    borderRadius: '1rem',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    fontWeight: '600',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(16, 185, 129, 0.4)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
                  }}
                >
                  Enviar Formulario
                </button>
              )}
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default App