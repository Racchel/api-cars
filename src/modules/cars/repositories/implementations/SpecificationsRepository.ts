import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { 
    ICreateSpecificationDTO, 
    ISpecificationsRepository 
} from "../ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {

    private repository: Repository<Specification>;

    constructor() {
        this.repository = getRepository(Specification);
    }
    
    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        // insere os dados no objeto
        const spepcification = this.repository.create({
            description,
            name
        });

        // insere o objeto no array
        await this.repository.save(specification);
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
}

export { SpecificationsRepository };