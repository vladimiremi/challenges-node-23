import { PetsRepository } from "../repositories/pets-repository";

interface ICreatePetUseCase {
    name: string, 
    about: string | null,
    size: number,
    energy: number,
    phone: string,
    address: string,
}

export class CreatePetUseCase {
    constructor(private petRepository: PetsRepository){}
    execute(data: ICreatePetUseCase){
        this.petRepository.create(data)
    }
}