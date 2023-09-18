export interface Pet {
  id: string
  name: string
  about: string
  size: number
  energy: number
  independency: number
  age: number
  requisite: string
  environment: number
  phone: string
  // address
  street: string | null
  number: string | null
  state: string | null
  cep: string | null
  neighborhood: string | null
  city: string | null
}
