import React, { useState, useMemo, useCallback } from 'react';
import { Plus, X, LayoutGrid, List, ChevronLeft, ChevronRight, Edit, Trash2, ArrowLeft, Clock, ChevronsUpDown, RefreshCw, Search, Filter, XCircle, Bell, PieChart, BarChart2, ArrowDown, ArrowUp } from 'lucide-react';
// Para los gráficos, necesitarás instalar 'recharts': npm install recharts
import { PieChart as RechartsPieChart, Pie, Cell, BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- ESTRUCTURA DE DATOS CON HISTORIAL ---
const initialProjectsData = [
  {
    id: 'PROJ-001',
    versions: [{
      version: 1,
      nombreProyecto: 'Lanzamiento Plataforma E-commerce',
      cliente: 'Tiendas Modernas S.A.',
      gerenteProyecto: 'Ana García',
      fechaInicio: '2024-01-15',
      fechaFinPrevista: '2025-09-30',
      estado: 'En Progreso',
      prioridad: 'Alta',
      descripcion: 'Desarrollo e implementación de una nueva plataforma de comercio electrónico.',
      categoria: 'Desarrollo Web',
      objetivoPrincipal: 'Aumentar las ventas online en un 30% en el primer año.',
      entregablesClave: 'Diseño UI/UX, Backend, Frontend, Pasarela de Pagos, Pruebas de Carga',
      criteriosExito: '99.9% de uptime, Tasa de conversión del 5%, Carga de página < 2s',
      equipoPrincipal: 'Juan Pérez (Líder Técnico), María Rodríguez (Diseñadora UX)',
      stakeholders: 'Junta Directiva, Departamento de Marketing',
      departamento: 'Tecnología',
      ubicacion: 'Global',
      tecnologias: 'React, Node.js, PostgreSQL, AWS',
      riesgosIdentificados: 'Retrasos en la integración con el sistema de inventario.',
      supuestos: 'El presupuesto asignado será suficiente.',
      presupuestoTotal: 150000,
      costoEstimadoPersonal: 80000,
      costoEstimadoSoftware: 20000,
      costoEstimadoHardware: 10000,
      costoViajes: 5000,
      costoContingencia: 35000,
      moneda: 'USD',
      centroCostos: 'CC-WEB-01',
      codigoFacturacion: 'BF-2024-01',
      margenBeneficioEstimado: 25,
      fechaFinReal: null,
      costoRealTotal: 0,
      kpis: 'Ventas diarias, Tasa de abandono de carrito',
      leccionesAprendidas: '',
      satisfaccionCliente: 0,
      documentacionUrl: 'http://docs.example.com/proj-001',
      reporteCierreUrl: '',
      horasEstimadas: 2400,
      horasReales: 980,
      desviacionCronograma: 0,
      renewalNotes: '',
    }]
  },
  {
    id: 'PROJ-002',
    versions: [{
      version: 1,
      nombreProyecto: 'Campaña de Marketing Digital Q3',
      cliente: 'Marketing Interno',
      gerenteProyecto: 'Carlos Méndez',
      fechaInicio: '2025-07-01',
      fechaFinPrevista: '2025-07-25', // Fecha próxima para notificación
      estado: 'Planificado',
      prioridad: 'Media',
      descripcion: 'Campaña para promocionar la nueva línea de productos de verano.',
      categoria: 'Marketing',
      objetivoPrincipal: 'Generar 5,000 leads calificados.',
      entregablesClave: 'Anuncios en redes sociales, Contenido de blog, Videos promocionales',
      criteriosExito: 'Costo por lead < $10, Tasa de clics del 2%',
      equipoPrincipal: 'Laura Torres (Estratega), David Jiménez (Creador de Contenido)',
      stakeholders: 'Director de Marketing, Equipo de Ventas',
      departamento: 'Marketing',
      ubicacion: 'Norteamérica',
      tecnologias: 'Google Ads, Facebook Ads, HubSpot',
      riesgosIdentificados: 'Bajo rendimiento de los anuncios.',
      supuestos: 'El público objetivo responderá positivamente.',
      presupuestoTotal: 50000,
      costoEstimadoPersonal: 15000,
      costoEstimadoSoftware: 5000,
      costoEstimadoHardware: 0,
      costoViajes: 0,
      costoContingencia: 5000,
      moneda: 'USD',
      centroCostos: 'CC-MKT-03',
      codigoFacturacion: 'N/A',
      margenBeneficioEstimado: 0,
      fechaFinReal: null,
      costoRealTotal: 0,
      kpis: 'Leads generados, Tasa de conversión de landing page',
      leccionesAprendidas: '',
      satisfaccionCliente: 0,
      documentacionUrl: 'http://docs.example.com/proj-002',
      reporteCierreUrl: '',
      horasEstimadas: 400,
      horasReales: 0,
      desviacionCronograma: 0,
      renewalNotes: '',
    }]
  },
  {
    id: 'PROJ-003',
    versions: [{
      version: 1,
      nombreProyecto: 'Actualización de Infraestructura',
      cliente: 'Operaciones Internas',
      gerenteProyecto: 'Sofía Castro',
      fechaInicio: '2023-03-01',
      fechaFinPrevista: '2024-06-30', // Fecha pasada para demostrar estado "Vencido"
      estado: 'En Progreso',
      prioridad: 'Alta',
      descripcion: 'Migración de servidores on-premise a la nube de AWS.',
      categoria: 'Infraestructura',
      objetivoPrincipal: 'Reducir costos de mantenimiento en un 20% y mejorar la escalabilidad.',
      entregablesClave: 'Plan de migración, Entorno de pruebas, Migración finalizada',
      criteriosExito: 'Cero downtime durante la migración, Costos reducidos según lo previsto',
      equipoPrincipal: 'Pedro Pascal (Arquitecto Cloud), Elena Solís (DevOps)',
      stakeholders: 'CTO, Director de Operaciones',
      departamento: 'IT',
      ubicacion: 'Datacenter Central',
      tecnologias: 'AWS, Terraform, Ansible',
      riesgosIdentificados: 'Problemas de compatibilidad de software.',
      supuestos: 'El equipo tiene las habilidades necesarias para la migración.',
      presupuestoTotal: 80000,
      costoEstimadoPersonal: 40000,
      costoEstimadoSoftware: 10000,
      costoEstimadoHardware: 0,
      costoViajes: 0,
      costoContingencia: 10000,
      moneda: 'USD',
      centroCostos: 'CC-IT-05',
      codigoFacturacion: 'N/A',
      margenBeneficioEstimado: 0,
      fechaFinReal: null,
      costoRealTotal: 75000,
      kpis: 'Uso de CPU, Tiempo de respuesta del servidor',
      leccionesAprendidas: 'La planificación detallada de la red fue crucial para el éxito.',
      satisfaccionCliente: 5,
      documentacionUrl: 'http://docs.example.com/proj-003',
      reporteCierreUrl: 'http://docs.example.com/proj-003/cierre',
      horasEstimadas: 800,
      horasReales: 780,
      desviacionCronograma: -5,
      renewalNotes: '',
    }]
  },
];

// --- COMPONENTES AUXILIARES ---
const FormInput = ({ id, label, type = 'text', value, onChange, required = false }) => (<div><label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label><input type={type} id={id} name={id} value={value} onChange={onChange} required={required} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" /></div>);
const FormTextarea = ({ id, label, value, onChange }) => (<div><label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label><textarea id={id} name={id} rows="3" value={value} onChange={onChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea></div>);
const FormSelect = ({ id, label, value, onChange, options, required = false }) => (<div><label htmlFor={id} className="block text-sm font-medium text-gray-700">{label}</label><select id={id} name={id} value={value} onChange={onChange} required={required} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">{options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>);

const getProjectStatus = (projectVersion) => {
  if (!projectVersion) return 'Desconocido';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (['En Progreso', 'Planificado'].includes(projectVersion.estado) && projectVersion.fechaFinPrevista && new Date(projectVersion.fechaFinPrevista) < today) {
    return 'Vencido';
  }
  return projectVersion.estado;
};

const STATUS_COLORS = { 'En Progreso': '#3b82f6', 'Completado': '#22c55e', 'Planificado': '#f59e0b', 'Vencido': '#ef4444', 'Cancelado': '#6b7280' };
const StatusBadge = ({ status }) => {
  const statusColor = useMemo(() => {
    switch (status) {
      case 'En Progreso': return 'bg-blue-100 text-blue-800';
      case 'Completado': return 'bg-green-100 text-green-800';
      case 'Planificado': return 'bg-yellow-100 text-yellow-800';
      case 'Vencido': return 'bg-red-100 text-red-800';
      case 'Cancelado': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }, [status]);
  return <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColor}`}>{status}</span>;
};


// --- MODALES (sin cambios) ---
const RenewProjectModal = ({ isOpen, onClose, onRenew, projectToRenew }) => {
  const [renewalData, setRenewalData] = useState({ fechaFinPrevista: '', presupuestoTotal: 0, renewalNotes: '' });
  React.useEffect(() => {
    if (projectToRenew) {
      const latestVersion = projectToRenew.versions[0];
      setRenewalData({ fechaFinPrevista: latestVersion.fechaFinPrevista, presupuestoTotal: latestVersion.presupuestoTotal, renewalNotes: '' });
    }
  }, [projectToRenew, isOpen]);
  const handleChange = (e) => { const { name, value, type } = e.target; setRenewalData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value })); };
  const handleSubmit = (e) => { e.preventDefault(); onRenew(renewalData, projectToRenew); };
  if (!isOpen) return null;
  return (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"> <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg"> <form onSubmit={handleSubmit}> <div className="p-6"> <div className="flex items-center gap-3"> <RefreshCw className="text-blue-600" size={24} /> <h2 className="text-xl font-bold text-gray-800">Renovar Proyecto</h2> </div> <p className="text-sm text-gray-600 mt-1">Establece la nueva fecha de finalización y presupuesto.</p> <div className="mt-6 space-y-4"> <FormInput id="fechaFinPrevista" label="Nueva Fecha de Finalización" type="date" value={renewalData.fechaFinPrevista} onChange={handleChange} required /> <FormInput id="presupuestoTotal" label="Nuevo Presupuesto Total" type="number" value={renewalData.presupuestoTotal} onChange={handleChange} /> <FormTextarea id="renewalNotes" label="Notas de Renovación" value={renewalData.renewalNotes} onChange={handleChange} /> </div> </div> <div className="bg-gray-50 px-6 py-4 flex justify-end items-center gap-4 rounded-b-lg"> <button type="button" onClick={onClose} className="text-sm font-medium text-gray-700 hover:text-gray-900">Cancelar</button> <button type="submit" className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">Guardar Renovación</button> </div> </form> </div> </div>);
};
const ProjectFormModal = ({ isOpen, onClose, onSave, projectToEdit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const formSteps = [{ id: 1, title: 'Información General' }, { id: 2, title: 'Alcance y Equipo' }, { id: 3, title: 'Presupuesto y Costos' }, { id: 4, title: 'Seguimiento y Cierre' }];
  React.useEffect(() => {
    if (projectToEdit) {
      setFormData(projectToEdit.versions[0]);
    } else {
      const emptyProject = initialProjectsData[0] ? Object.keys(initialProjectsData[0].versions[0]).reduce((acc, key) => ({ ...acc, [key]: '' }), {}) : {};
      setFormData({ ...emptyProject, id: `PROJ-${String(Date.now()).slice(-5)}`, estado: 'Planificado', prioridad: 'Media', moneda: 'USD', presupuestoTotal: 0, costoEstimadoPersonal: 0, costoEstimadoSoftware: 0, costoEstimadoHardware: 0, costoViajes: 0, costoContingencia: 0, margenBeneficioEstimado: 0, satisfaccionCliente: 0, horasEstimadas: 0, horasReales: 0, desviacionCronograma: 0, renewalNotes: '' });
    }
    setCurrentStep(1);
  }, [projectToEdit, isOpen]);
  const handleChange = (e) => { const { name, value, type } = e.target; setFormData(prev => ({ ...prev, [name]: type === 'number' ? parseFloat(value) || 0 : value })); };
  const handleNext = () => setCurrentStep(prev => Math.min(prev + 1, formSteps.length));
  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData, projectToEdit); };
  if (!isOpen) return null;
  return (<div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"> <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col"> <div className="flex justify-between items-center p-4 border-b"><h2 className="text-xl font-bold text-gray-800">{projectToEdit ? 'Crear Nueva Versión del Proyecto' : 'Nuevo Proyecto'}</h2><button onClick={onClose} className="text-gray-500 hover:text-gray-800"><X size={24} /></button></div> <div className="p-6 overflow-y-auto"> <div className="mb-6"><ol className="flex items-center w-full">{formSteps.map((step, index) => (<li key={step.id} className={`flex w-full items-center ${index < formSteps.length - 1 ? "after:content-[''] after:w-full after:h-1 after:border-b after:border-4 after:inline-block" : ""} ${step.id < currentStep ? 'after:border-indigo-600' : 'after:border-gray-300'}`}><span className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 ${step.id <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'}`}>{step.id}</span></li>))}</ol></div> <h3 className="text-lg font-semibold text-gray-700 mb-4">{formSteps[currentStep - 1].title}</h3> <form onSubmit={handleSubmit} className="space-y-4"> <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> {currentStep === 1 && (<> <FormInput id="nombreProyecto" label="Nombre del Proyecto" value={formData.nombreProyecto || ''} onChange={handleChange} required /> <FormInput id="cliente" label="Cliente" value={formData.cliente || ''} onChange={handleChange} required /> <FormInput id="gerenteProyecto" label="Gerente de Proyecto" value={formData.gerenteProyecto || ''} onChange={handleChange} /> <FormInput id="fechaInicio" label="Fecha de Inicio" type="date" value={formData.fechaInicio || ''} onChange={handleChange} /> <FormInput id="fechaFinPrevista" label="Fecha Fin Prevista" type="date" value={formData.fechaFinPrevista || ''} onChange={handleChange} /> <FormSelect id="estado" label="Estado" value={formData.estado || 'Planificado'} onChange={handleChange} options={['Planificado', 'En Progreso', 'Completado', 'En Espera', 'Cancelado']} /> <FormSelect id="prioridad" label="Prioridad" value={formData.prioridad || 'Media'} onChange={handleChange} options={['Baja', 'Media', 'Alta', 'Crítica']} /> <FormInput id="categoria" label="Categoría" value={formData.categoria || ''} onChange={handleChange} /> <div className="md:col-span-2"><FormTextarea id="descripcion" label="Descripción Corta" value={formData.descripcion || ''} onChange={handleChange} /></div></>)} {currentStep === 2 && (<> <div className="md:col-span-2"><FormTextarea id="objetivoPrincipal" label="Objetivo Principal" value={formData.objetivoPrincipal || ''} onChange={handleChange} /></div> <div className="md:col-span-2"><FormTextarea id="entregablesClave" label="Entregables Clave (separados por comas)" value={formData.entregablesClave || ''} onChange={handleChange} /></div> <div className="md:col-span-2"><FormTextarea id="criteriosExito" label="Criterios de Éxito" value={formData.criteriosExito || ''} onChange={handleChange} /></div> <FormInput id="equipoPrincipal" label="Equipo Principal" value={formData.equipoPrincipal || ''} onChange={handleChange} /> <FormInput id="stakeholders" label="Stakeholders" value={formData.stakeholders || ''} onChange={handleChange} /> <FormInput id="departamento" label="Departamento" value={formData.departamento || ''} onChange={handleChange} /> <FormInput id="ubicacion" label="Ubicación" value={formData.ubicacion || ''} onChange={handleChange} /> <FormInput id="tecnologias" label="Tecnologías Usadas" value={formData.tecnologias || ''} onChange={handleChange} /> <div className="md:col-span-2"><FormTextarea id="riesgosIdentificados" label="Riesgos Identificados" value={formData.riesgosIdentificados || ''} onChange={handleChange} /></div></>)} {currentStep === 3 && (<> <FormInput id="presupuestoTotal" label="Presupuesto Total" type="number" value={formData.presupuestoTotal || 0} onChange={handleChange} /> <FormInput id="costoEstimadoPersonal" label="Costo Estimado Personal" type="number" value={formData.costoEstimadoPersonal || 0} onChange={handleChange} /> <FormInput id="costoEstimadoSoftware" label="Costo Estimado Software" type="number" value={formData.costoEstimadoSoftware || 0} onChange={handleChange} /> <FormInput id="costoEstimadoHardware" label="Costo Estimado Hardware" type="number" value={formData.costoEstimadoHardware || 0} onChange={handleChange} /> <FormInput id="costoViajes" label="Costo Viajes" type="number" value={formData.costoViajes || 0} onChange={handleChange} /> <FormInput id="costoContingencia" label="Costo Contingencia" type="number" value={formData.costoContingencia || 0} onChange={handleChange} /> <FormSelect id="moneda" label="Moneda" value={formData.moneda || 'USD'} onChange={handleChange} options={['USD', 'EUR', 'COP', 'MXN']} /> <FormInput id="centroCostos" label="Centro de Costos" value={formData.centroCostos || ''} onChange={handleChange} /> <FormInput id="codigoFacturacion" label="Código de Facturación" value={formData.codigoFacturacion || ''} onChange={handleChange} /> <FormInput id="margenBeneficioEstimado" label="Margen de Beneficio Estimado (%)" type="number" value={formData.margenBeneficioEstimado || 0} onChange={handleChange} /> </>)} {currentStep === 4 && (<> <FormInput id="fechaFinReal" label="Fecha Fin Real" type="date" value={formData.fechaFinReal || ''} onChange={handleChange} /> <FormInput id="costoRealTotal" label="Costo Real Total" type="number" value={formData.costoRealTotal || 0} onChange={handleChange} /> <FormInput id="horasEstimadas" label="Horas Estimadas" type="number" value={formData.horasEstimadas || 0} onChange={handleChange} /> <FormInput id="horasReales" label="Horas Reales" type="number" value={formData.horasReales || 0} onChange={handleChange} /> <FormInput id="desviacionCronograma" label="Desviación Cronograma (días)" type="number" value={formData.desviacionCronograma || 0} onChange={handleChange} /> <FormSelect id="satisfaccionCliente" label="Satisfacción del Cliente (1-5)" value={formData.satisfaccionCliente || 0} onChange={handleChange} options={[0, 1, 2, 3, 4, 5]} /> <div className="md:col-span-2"><FormTextarea id="kpis" label="KPIs (separados por comas)" value={formData.kpis || ''} onChange={handleChange} /></div> <div className="md:col-span-2"><FormTextarea id="leccionesAprendidas" label="Lecciones Aprendidas" value={formData.leccionesAprendidas || ''} onChange={handleChange} /></div> <FormInput id="documentacionUrl" label="URL Documentación" value={formData.documentacionUrl || ''} onChange={handleChange} /> <FormInput id="reporteCierreUrl" label="URL Reporte de Cierre" value={formData.reporteCierreUrl || ''} onChange={handleChange} /> </>)} </div> </form> </div> <div className="flex justify-between items-center p-4 border-t mt-auto"> <button onClick={handleBack} disabled={currentStep === 1} className="flex items-center gap-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"><ChevronLeft size={18} /> Atrás</button> {currentStep < formSteps.length ? (<button onClick={handleNext} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">Siguiente <ChevronRight size={18} /></button>) : (<button type="submit" onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">Guardar Proyecto</button>)} </div> </div> </div>);
};

// --- VISTAS DE LISTA (TABLA Y CARDS) ---
const SortableHeader = ({ children, sortKey, sortConfig, onSort }) => {
  const isSorted = sortConfig.key === sortKey;
  const Icon = isSorted ? (sortConfig.direction === 'ascending' ? ArrowUp : ArrowDown) : ChevronsUpDown;
  return (
    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => onSort(sortKey)}>
      <div className="flex items-center gap-2">
        {children}
        <Icon size={14} className={isSorted ? 'text-gray-800' : 'text-gray-400'} />
      </div>
    </th>
  );
};
const ProjectTable = ({ projects, onEdit, onDelete, onSelectProject, onRenew, sortConfig, onSort }) => (<div className="overflow-x-auto bg-white rounded-lg shadow"> <table className="min-w-full divide-y divide-gray-200"> <thead className="bg-gray-50"><tr><SortableHeader sortKey="nombreProyecto" sortConfig={sortConfig} onSort={onSort}>Proyecto</SortableHeader><SortableHeader sortKey="cliente" sortConfig={sortConfig} onSort={onSort}>Cliente</SortableHeader><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gerente</th><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th><SortableHeader sortKey="fechaFinPrevista" sortConfig={sortConfig} onSort={onSort}>Fechas</SortableHeader><th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th></tr></thead> <tbody className="bg-white divide-y divide-gray-200"> {projects.map(p => { const currentVersion = p.versions[0]; const status = getProjectStatus(currentVersion); return (<tr key={p.id} className="hover:bg-gray-50"> <td className="px-6 py-4 whitespace-nowrap"><button onClick={() => onSelectProject(p.id)} className="text-sm font-medium text-indigo-600 hover:text-indigo-800 text-left">{currentVersion.nombreProyecto}</button><div className="text-sm text-gray-500">{p.id}</div></td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{currentVersion.cliente}</td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{currentVersion.gerenteProyecto}</td> <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={status} /></td> <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"><div>Inicio: {currentVersion.fechaInicio}</div><div>Fin: {currentVersion.fechaFinPrevista}</div></td> <td className="px-6 py-4 whitespace-nowrap text-sm font-medium"><div className="flex items-center gap-2"> {status === 'Vencido' && <button onClick={() => onRenew(p)} className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-md text-xs hover:bg-blue-600"><RefreshCw size={14} />Renovar</button>} <button onClick={() => onEdit(p)} className="text-indigo-600 hover:text-indigo-900 p-1"><Edit size={18} /></button> <button onClick={() => onDelete(p.id)} className="text-red-600 hover:text-red-900 p-1"><Trash2 size={18} /></button> </div></td> </tr>); })} </tbody> </table> </div>);
const ProjectCards = ({ projects, onEdit, onDelete, onSelectProject, onRenew }) => (<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> {projects.map(p => { const currentVersion = p.versions[0]; const status = getProjectStatus(currentVersion); return (<div key={p.id} className="bg-white rounded-lg shadow flex flex-col"> <div className="p-6 flex-grow"> <div className="flex justify-between items-start"><StatusBadge status={status} /><span className="text-xs font-semibold text-gray-500">{currentVersion.prioridad}</span></div> <button onClick={() => onSelectProject(p.id)} className="text-lg font-bold text-gray-900 mt-2 hover:text-indigo-700 text-left">{currentVersion.nombreProyecto}</button> <p className="text-sm text-gray-600 mt-1">{currentVersion.cliente}</p> <div className="mt-4 border-t pt-4"><p className="text-sm text-gray-500">Gerente: <span className="font-medium text-gray-700">{currentVersion.gerenteProyecto}</span></p><p className="text-sm text-gray-500 mt-1">Fechas: <span className="font-medium text-gray-700">{currentVersion.fechaInicio} al {currentVersion.fechaFinPrevista}</span></p></div> </div> <div className="bg-gray-50 p-4 flex justify-end gap-4 rounded-b-lg items-center"> {status === 'Vencido' && <button onClick={() => onRenew(p)} className="flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-800"><RefreshCw size={16} /> Renovar</button>} <button onClick={() => onEdit(p)} className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1 text-sm"><Edit size={16} /> Editar</button> <button onClick={() => onDelete(p.id)} className="text-red-600 hover:text-red-900 flex items-center gap-1 text-sm"><Trash2 size={16} /> Eliminar</button> </div> </div>); })} </div>);

// --- VISTA DE DETALLE (sin cambios) ---
const DetailSection = ({ title, children }) => (<div className="bg-white p-6 rounded-lg shadow-sm"> <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">{title}</h3> <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-4">{children}</div> </div>);
const DetailItem = ({ label, value }) => (<div className="text-sm"><p className="text-gray-500">{label}</p><p className="text-gray-800 font-medium">{value || 'N/A'}</p></div>);
const ProjectDetailView = ({ project, onBack, onRenew }) => {
  const [openHistory, setOpenHistory] = useState(false);
  const currentVersion = project.versions[0];
  const history = project.versions.slice(1);
  const status = getProjectStatus(currentVersion);
  return (<div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg"> <button onClick={onBack} className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-semibold mb-6"><ArrowLeft size={20} /> Volver a la lista</button> <header className="mb-8 border-b pb-4"> <div className="flex flex-col sm:flex-row justify-between items-start gap-4"> <div> <h2 className="text-3xl font-bold text-gray-900">{currentVersion.nombreProyecto} <span className="text-xl font-normal text-gray-500">({project.id})</span></h2> <p className="text-gray-600 mt-1">{currentVersion.descripcion}</p> </div> <div className="flex flex-col items-end gap-2 flex-shrink-0"> <StatusBadge status={status} /> {status === 'Vencido' && <button onClick={() => onRenew(project)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700"><RefreshCw size={18} />Renovar Proyecto</button>} </div> </div> </header> <div className="space-y-8"> <DetailSection title="Información General"><DetailItem label="Cliente" value={currentVersion.cliente} /><DetailItem label="Gerente de Proyecto" value={currentVersion.gerenteProyecto} /><DetailItem label="Categoría" value={currentVersion.categoria} /><DetailItem label="Prioridad" value={currentVersion.prioridad} /><DetailItem label="Fecha de Inicio" value={currentVersion.fechaInicio} /><DetailItem label="Fecha Fin Prevista" value={currentVersion.fechaFinPrevista} /></DetailSection> <DetailSection title="Alcance y Equipo"><DetailItem label="Objetivo Principal" value={currentVersion.objetivoPrincipal} /><DetailItem label="Criterios de Éxito" value={currentVersion.criteriosExito} /><DetailItem label="Entregables Clave" value={currentVersion.entregablesClave} /><DetailItem label="Equipo Principal" value={currentVersion.equipoPrincipal} /><DetailItem label="Stakeholders" value={currentVersion.stakeholders} /><DetailItem label="Tecnologías" value={currentVersion.tecnologias} /></DetailSection> <DetailSection title="Presupuesto y Costos"><DetailItem label="Presupuesto Total" value={`${currentVersion.presupuestoTotal} ${currentVersion.moneda}`} /><DetailItem label="Costo Estimado Personal" value={`${currentVersion.costoEstimadoPersonal} ${currentVersion.moneda}`} /><DetailItem label="Costo Estimado Software" value={`${currentVersion.costoEstimadoSoftware} ${currentVersion.moneda}`} /><DetailItem label="Costo Estimado Hardware" value={`${currentVersion.costoEstimadoHardware} ${currentVersion.moneda}`} /><DetailItem label="Costo Viajes" value={`${currentVersion.costoViajes} ${currentVersion.moneda}`} /><DetailItem label="Costo Contingencia" value={`${currentVersion.costoContingencia} ${currentVersion.moneda}`} /></DetailSection> <DetailSection title="Seguimiento y Cierre"><DetailItem label="Horas Estimadas" value={currentVersion.horasEstimadas} /><DetailItem label="Horas Reales" value={currentVersion.horasReales} /><DetailItem label="Fecha Fin Real" value={currentVersion.fechaFinReal} /><DetailItem label="Costo Real Total" value={`${currentVersion.costoRealTotal} ${currentVersion.moneda}`} /><DetailItem label="Satisfacción del Cliente (1-5)" value={currentVersion.satisfaccionCliente} /><DetailItem label="KPIs" value={currentVersion.kpis} /></DetailSection> {history.length > 0 && (<div className="bg-gray-50 p-4 rounded-lg"> <button onClick={() => setOpenHistory(!openHistory)} className="w-full flex justify-between items-center text-left font-semibold text-gray-700"> <span className="flex items-center gap-2"><Clock size={18} /> Historial de Versiones ({history.length})</span> <ChevronsUpDown size={20} className={`transition-transform ${openHistory ? 'rotate-180' : ''}`} /> </button> {openHistory && (<div className="mt-4 space-y-4"> {history.map(v => (<div key={v.version} className="p-4 bg-white rounded shadow-sm border"> <p className="font-bold">Versión {v.version}</p> <p className="text-sm">Fechas: {v.fechaInicio} a {v.fechaFinPrevista}</p> <p className="text-sm">Estado: {v.estado}</p> <p className="text-sm">Presupuesto: {v.presupuestoTotal} {v.moneda}</p> {v.renewalNotes && <p className="text-sm mt-2 pt-2 border-t"><b>Nota de Renovación:</b> {v.renewalNotes}</p>} </div>))} </div>)} </div>)} </div> </div>);
};

// --- NUEVO COMPONENTE: DASHBOARD ---
const DashboardView = ({ projects }) => {
  const statusData = useMemo(() => {
    const counts = projects.reduce((acc, p) => {
      const status = getProjectStatus(p.versions[0]);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const priorityData = useMemo(() => {
    const counts = projects.reduce((acc, p) => {
      const priority = p.versions[0].prioridad;
      acc[priority] = (acc[priority] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [projects]);

  const budgetData = useMemo(() => {
    const budgets = projects.reduce((acc, p) => {
      const category = p.versions[0].categoria || 'Sin Categoría';
      const budget = p.versions[0].presupuestoTotal || 0;
      acc[category] = (acc[category] || 0) + budget;
      return acc;
    }, {});
    return Object.entries(budgets).map(([name, value]) => ({ name, value }));
  }, [projects]);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Proyectos por Estado</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RechartsPieChart>
                <Pie data={statusData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#cccccc'} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Proyectos por Prioridad</h3>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <RechartsBarChart data={priorityData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" name="Nº de Proyectos" fill="#8884d8" />
              </RechartsBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Presupuesto por Categoría</h3>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <RechartsBarChart data={budgetData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="name" width={150} />
              <Tooltip formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value)} />
              <Legend />
              <Bar dataKey="value" name="Presupuesto Total" fill="#82ca9d" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ---
export default function App() {
  const [projects, setProjects] = useState(initialProjectsData);
  const [viewMode, setViewMode] = useState('card');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState(null);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false);
  const [projectToRenew, setProjectToRenew] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos');
  const [priorityFilter, setPriorityFilter] = useState('Todas');
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [currentView, setCurrentView] = useState('dashboard'); // 'dashboard' o 'projects'
  const [sortConfig, setSortConfig] = useState({ key: 'nombreProyecto', direction: 'ascending' });

  // --- LÓGICA DE NOTIFICACIONES ---
  const notifications = useMemo(() => {
    const alerts = [];
    const today = new Date();
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    projects.forEach(p => {
      const v = p.versions[0];
      const status = getProjectStatus(v);
      if (status === 'Vencido') {
        alerts.push({ id: p.id, type: 'Vencido', message: `El proyecto "${v.nombreProyecto}" está vencido.` });
      } else {
        const endDate = new Date(v.fechaFinPrevista);
        if (endDate >= today && endDate <= thirtyDaysFromNow) {
          alerts.push({ id: p.id, type: 'Por Vencer', message: `El proyecto "${v.nombreProyecto}" vence pronto.` });
        }
      }
    });
    return alerts;
  }, [projects]);

  // --- LÓGICA DE MANEJO DE ESTADOS (sin cambios) ---
  const handleOpenModal = useCallback((project = null) => { setProjectToEdit(project); setIsModalOpen(true); }, []);
  const handleCloseModal = useCallback(() => { setIsModalOpen(false); setProjectToEdit(null); }, []);
  const handleOpenRenewModal = useCallback((project) => { setProjectToRenew(project); setIsRenewModalOpen(true); }, []);
  const handleCloseRenewModal = useCallback(() => { setIsRenewModalOpen(false); setProjectToRenew(null); }, []);
  const handleSaveProject = useCallback((formData, originalProject) => {
    if (originalProject) {
      setProjects(prev => prev.map(p => p.id === originalProject.id ? { ...p, versions: [{ ...formData, version: p.versions[0].version + 1 }, ...p.versions] } : p));
    } else {
      setProjects(prev => [...prev, { id: `PROJ-${String(Date.now()).slice(-5)}`, versions: [{ ...formData, version: 1 }] }]);
    }
    handleCloseModal();
  }, [handleCloseModal]);
  const handleRenewProject = useCallback((renewalData, projectToRenew) => {
    setProjects(prev => prev.map(p => p.id === projectToRenew.id ? { ...p, versions: [{ ...p.versions[0], ...renewalData, version: p.versions[0].version + 1, estado: 'En Progreso' }, ...p.versions] } : p));
    handleCloseRenewModal();
  }, [handleCloseRenewModal]);
  const handleDeleteProject = useCallback((projectId) => { setProjects(prev => prev.filter(p => p.id !== projectId)); }, []);
  const handleSelectProject = useCallback((projectId) => { setSelectedProjectId(projectId); setCurrentView('projects'); }, []);
  const handleBackToList = useCallback(() => setSelectedProjectId(null), []);

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const sortedAndFilteredProjects = useMemo(() => {
    let filtered = projects.filter(p => {
      const currentVersion = p.versions[0];
      const status = getProjectStatus(currentVersion);
      const searchLower = searchTerm.toLowerCase();
      if (statusFilter !== 'Todos' && status !== statusFilter) return false;
      if (priorityFilter !== 'Todas' && currentVersion.prioridad !== priorityFilter) return false;
      if (searchTerm && !currentVersion.nombreProyecto.toLowerCase().includes(searchLower) && !currentVersion.cliente.toLowerCase().includes(searchLower) && !currentVersion.gerenteProyecto.toLowerCase().includes(searchLower)) return false;
      return true;
    });

    filtered.sort((a, b) => {
      const valA = a.versions[0][sortConfig.key];
      const valB = b.versions[0][sortConfig.key];
      if (valA < valB) return sortConfig.direction === 'ascending' ? -1 : 1;
      if (valA > valB) return sortConfig.direction === 'ascending' ? 1 : -1;
      return 0;
    });

    return filtered;
  }, [projects, searchTerm, statusFilter, priorityFilter, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const resetFilters = () => { setSearchTerm(''); setStatusFilter('Todos'); setPriorityFilter('Todas'); };
  const selectedProject = useMemo(() => projects.find(p => p.id === selectedProjectId), [projects, selectedProjectId]);

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      <ProjectFormModal isOpen={isModalOpen} onClose={handleCloseModal} onSave={handleSaveProject} projectToEdit={projectToEdit} />
      <RenewProjectModal isOpen={isRenewModalOpen} onClose={handleCloseRenewModal} onRenew={handleRenewProject} projectToRenew={projectToRenew} />

      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center">
            <div><h1 className="text-3xl font-bold text-gray-800">Panel de Proyectos</h1><p className="text-gray-600 mt-1">Gestión y analítica para proyectos de la empresa.</p></div>
            <div className="flex items-center gap-4 mt-4 sm:mt-0">
              <div className="relative">
                <button onClick={() => setNotificationsOpen(o => !o)} className="relative text-gray-600 hover:text-indigo-600 p-2">
                  <Bell size={24} />
                  {notifications.length > 0 && <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">{notifications.length}</span>}
                </button>
                {notificationsOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl z-20">
                    <div className="p-4 font-bold border-b">Notificaciones</div>
                    <ul className="py-2 max-h-64 overflow-y-auto">
                      {notifications.length > 0 ? notifications.map(n => (
                        <li key={n.id + n.type} className={`px-4 py-2 border-l-4 ${n.type === 'Vencido' ? 'border-red-500' : 'border-yellow-500'}`}>
                          <a href="#" onClick={(e) => { e.preventDefault(); handleSelectProject(n.id); setNotificationsOpen(false); }} className="text-sm text-gray-700 hover:bg-gray-100">{n.message}</a>
                        </li>
                      )) : <li className="px-4 py-3 text-sm text-gray-500">No hay notificaciones nuevas.</li>}
                    </ul>
                  </div>
                )}
              </div>
              <button onClick={() => handleOpenModal()} className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"><Plus size={20} /><span>Nuevo Proyecto</span></button>
            </div>
          </div>
          <div className="mt-6 border-b border-gray-200">
            <nav className="-mb-px flex space-x-8" aria-label="Tabs">
              <button onClick={() => setCurrentView('dashboard')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${currentView === 'dashboard' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Dashboard</button>
              <button onClick={() => setCurrentView('projects')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${currentView === 'projects' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>Proyectos</button>
            </nav>
          </div>
        </header>

        {selectedProject ? (
          <ProjectDetailView project={selectedProject} onBack={handleBackToList} onRenew={handleOpenRenewModal} />
        ) : currentView === 'dashboard' ? (
          <DashboardView projects={projects} />
        ) : (
          <>
            <div className="p-4 bg-white rounded-lg shadow-sm mb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                <div className="lg:col-span-2">
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700">Buscar</label>
                  <div className="relative mt-1"><div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><Search className="h-5 w-5 text-gray-400" /></div><input type="text" id="search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} placeholder="Buscar por nombre, cliente, gerente..." className="block w-full rounded-md border-gray-300 pl-10 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" /></div>
                </div>
                <div>
                  <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-700">Estado</label>
                  <select id="statusFilter" value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"><option>Todos</option><option>Vencido</option><option>En Progreso</option><option>Planificado</option><option>Completado</option><option>Cancelado</option></select>
                </div>
                <div>
                  <label htmlFor="priorityFilter" className="block text-sm font-medium text-gray-700">Prioridad</label>
                  <select id="priorityFilter" value={priorityFilter} onChange={e => setPriorityFilter(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"><option>Todas</option><option>Crítica</option><option>Alta</option><option>Media</option><option>Baja</option></select>
                </div>
                {(searchTerm || statusFilter !== 'Todos' || priorityFilter !== 'Todas') && (<div className="md:col-start-2 lg:col-start-auto"> <button onClick={resetFilters} className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg shadow-sm hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition"> <XCircle size={18} /> <span>Limpiar Filtros</span> </button> </div>)}
              </div>
            </div>
            <main>
              <div className="flex justify-end mb-4">
                <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
                  <button onClick={() => setViewMode('card')} className={`p-2 rounded-md ${viewMode === 'card' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`} aria-label="Vista de tarjetas"><LayoutGrid size={20} /></button>
                  <button onClick={() => setViewMode('table')} className={`p-2 rounded-md ${viewMode === 'table' ? 'bg-indigo-600 text-white' : 'text-gray-500 hover:bg-gray-200'}`} aria-label="Vista de tabla"><List size={20} /></button>
                </div>
              </div>
              {sortedAndFilteredProjects.length > 0 ? (
                viewMode === 'table' ? (
                  <ProjectTable projects={sortedAndFilteredProjects} onEdit={handleOpenModal} onDelete={handleDeleteProject} onSelectProject={handleSelectProject} onRenew={handleOpenRenewModal} sortConfig={sortConfig} onSort={requestSort} />
                ) : (
                  <ProjectCards projects={sortedAndFilteredProjects} onEdit={handleOpenModal} onDelete={handleDeleteProject} onSelectProject={handleSelectProject} onRenew={handleOpenRenewModal} />
                )
              ) : (
                <div className="text-center py-16 px-6 bg-white rounded-lg shadow">
                  <Filter className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No se encontraron proyectos</h3>
                  <p className="mt-1 text-sm text-gray-500">Intenta ajustar tus filtros o tu término de búsqueda.</p>
                </div>
              )}
            </main>
          </>
        )}
      </div>
    </div>
  );
}
