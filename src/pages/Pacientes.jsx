import { useState, useEffect } from 'react'
import { supabase } from '../config/supabase'
import '../styles/pacientes.css'

const PIPELINE_STAGES = [
  { id: 'novo', label: 'Novo / Indicação' },
  { id: 'contato', label: 'Em Contato' },
  { id: 'followup', label: 'Follow-up' },
  { id: 'proposta', label: 'Proposta' },
  { id: 'convertido', label: 'Convertido' },
  { id: 'perdido', label: 'Perdido' },
]

export default function Pacientes() {
  const [tab, setTab] = useState('pipeline')

  return (
    <div className="page-container">
      <h1>Pacientes</h1>

      <div className="tabs">
        <button
          className={`tab ${tab === 'pipeline' ? 'active' : ''}`}
          onClick={() => setTab('pipeline')}
        >
          Pipeline
        </button>
        <button
          className={`tab ${tab === 'ativos' ? 'active' : ''}`}
          onClick={() => setTab('ativos')}
        >
          Pacientes Ativos
        </button>
      </div>

      {tab === 'pipeline' ? <PipelineKanban /> : <PacientesAtivos />}
    </div>
  )
}

function PipelineKanban() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [draggedId, setDraggedId] = useState(null)

  useEffect(() => {
    loadLeads()
  }, [])

  const loadLeads = () => {
    setLoading(true)
    supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setLeads(data || [])
      })
      .finally(() => setLoading(false))
  }

  const moveLead = async (leadId, newStatus) => {
    setLeads(prev =>
      prev.map(lead => (lead.id === leadId ? { ...lead, status: newStatus } : lead))
    )

    const { error } = await supabase
      .from('leads')
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq('id', leadId)

    if (error) {
      setError(error.message)
      loadLeads()
    }
  }

  const handleDrop = (stageId) => {
    if (draggedId) {
      moveLead(draggedId, stageId)
      setDraggedId(null)
    }
  }

  if (loading) return <p>Carregando pipeline...</p>
  if (error) return <p className="error-message">{error}</p>

  return (
    <div className="kanban-board">
      {PIPELINE_STAGES.map(stage => {
        const stageLeads = leads.filter(lead => (lead.status || 'novo') === stage.id)
        return (
          <div
            key={stage.id}
            className="kanban-column"
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(stage.id)}
          >
            <div className="kanban-column-header">
              <span>{stage.label}</span>
              <span className="kanban-count">{stageLeads.length}</span>
            </div>

            <div className="kanban-cards">
              {stageLeads.map(lead => (
                <div
                  key={lead.id}
                  className="kanban-card"
                  draggable
                  onDragStart={() => setDraggedId(lead.id)}
                  onDragEnd={() => setDraggedId(null)}
                >
                  <div className="kanban-card-name">{lead.nome}</div>
                  {lead.telefone && <div className="kanban-card-info">📱 {lead.telefone}</div>}
                  {lead.origem && <div className="kanban-card-info">Origem: {lead.origem}</div>}
                  {lead.modalidade_interesse && (
                    <div className="kanban-card-info">Interesse: {lead.modalidade_interesse}</div>
                  )}
                  {lead.valor_proposta && (
                    <div className="kanban-card-info">
                      Proposta: R$ {Number(lead.valor_proposta).toLocaleString('pt-BR')}
                    </div>
                  )}
                  <div className={`kanban-tag tag-${lead.temperatura || 'morno'}`}>
                    {lead.temperatura || 'morno'}
                  </div>
                </div>
              ))}
              {stageLeads.length === 0 && (
                <div className="kanban-empty">Nenhum lead nesta etapa</div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function PacientesAtivos() {
  const [atletas, setAtletas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('todas')

  useEffect(() => {
    supabase
      .from('atletas')
      .select('*')
      .order('nome')
      .then(({ data, error }) => {
        if (error) setError(error.message)
        else setAtletas(data || [])
      })
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p>Carregando pacientes...</p>
  if (error) return <p className="error-message">{error}</p>

  const categorias = ['todas', ...new Set(atletas.map(a => a.categoria).filter(Boolean))]

  const filtrados = atletas.filter(atleta => {
    const matchSearch = atleta.nome.toLowerCase().includes(search.toLowerCase())
    const matchCategoria = categoriaFiltro === 'todas' || atleta.categoria === categoriaFiltro
    return matchSearch && matchCategoria
  })

  return (
    <div>
      <div className="filters">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="filter-input"
        />
        <select
          value={categoriaFiltro}
          onChange={(e) => setCategoriaFiltro(e.target.value)}
          className="filter-select"
        >
          {categorias.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'todas' ? 'Todas as categorias' : cat}
            </option>
          ))}
        </select>
      </div>

      <div className="patients-table">
        <div className="patients-table-header">
          <span>Nome</span>
          <span>Email</span>
          <span>Telefone</span>
          <span>Categoria</span>
          <span>Status</span>
        </div>
        {filtrados.map(atleta => (
          <div key={atleta.id} className="patients-table-row">
            <span>{atleta.nome}</span>
            <span>{atleta.email || '-'}</span>
            <span>{atleta.telefone || '-'}</span>
            <span>{atleta.categoria || '-'}</span>
            <span className={`status-badge ${atleta.ativo ? 'status-ativo' : 'status-inativo'}`}>
              {atleta.ativo ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        ))}
        {filtrados.length === 0 && (
          <div className="patients-table-empty">Nenhum paciente encontrado</div>
        )}
      </div>
    </div>
  )
}
