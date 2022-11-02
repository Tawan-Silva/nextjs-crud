import Cliente from "../core/Cliente";

export interface FormularioProps {
    cliente: Cliente
    clienteMudou?: (cliente: Cliente) => void 
    cancelado?: () => void
}