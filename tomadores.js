import mongoose from 'mongoose'

const Tomadores = mongoose.mode('tomadores', {

  razaoSocial: String,
  fantasia: String,
  CNPJ: String,
  endereco: String,
  numero: String,
  complemento: String,
  bairro: String,
  cidade: String,
  CEP: String,
  email: String,
  telefoneFixo: String,
  celular: String
})

export default Tomadores
