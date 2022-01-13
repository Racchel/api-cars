import { Specification } from "../../entities/Specification";
import { 
    ICreateSpecificationDTO, 
    ISpecificationsRepository 
} from "./interfaces/ISpecificationsRepository";


class SpecificationsRepository implements ISpecificationsRepository {

    private specifications:  Specification[];

    constructor() {
        this.specifications = [];
    }
    
    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        // insere os dados no objeto
        Object.assign(specification, {
            name,
            description,
            created_at: new Date()
        });

        // insere o objeto no array
        this.specifications.push(specification);
    }

    findByName(name: string): Specification {
        const specification = this.specifications.find(
            (specification) => specification.name === name
        );

        return specification;
    }
}

export { SpecificationsRepository };