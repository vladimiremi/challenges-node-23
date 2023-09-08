import { InMemoryPetRepository } from "../../repositories/in-memory/in-memory-pet-repository";
import { CreatePetUseCase } from "../create-pet.usecase";


export function makeCreatePetUseCase(){
    const petsRepository = new InMemoryPetRepository()
    const createPetUseCase = new CreatePetUseCase(petsRepository)

    return createPetUseCase
}