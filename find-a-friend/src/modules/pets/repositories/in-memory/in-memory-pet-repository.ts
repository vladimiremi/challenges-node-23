import { randomUUID } from "node:crypto";
import { ICreatePet, PetsRepository } from "../pets-repository";
import { Pet } from "../../entities/pets.entity";

export class InMemoryPetRepository implements PetsRepository{
    public pets:Pet[] = []
    async create(data: ICreatePet): Promise<void> {

        const pet:Pet = {
            id: randomUUID(),
            name: data.name,
            about: data.about,
            address: data.address,
            energy: data.energy,
            phone: data.phone,
            size: data.size,
        }

        this.pets.push(pet)

    }

}