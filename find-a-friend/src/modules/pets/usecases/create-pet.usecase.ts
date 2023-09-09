import { Pet } from "../entities/pets.entity";
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
    async execute(data: ICreatePetUseCase):Promise<Pet>{
        const pet = await this.petRepository.create(data)
        
        return pet
    }
}