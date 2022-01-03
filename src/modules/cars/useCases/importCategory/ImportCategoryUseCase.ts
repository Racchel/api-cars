import fs from "fs";
import { parse as csvParse } from "csv-parse";
import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";

interface IImportCategory {
    name: string;
    description: string;
}

class ImportCategoryUseCase {

    constructor(private categoriesRepository: CategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IImportCategory[]>{
        return new Promise((resolve, reject) => {
            // criando stream do arquivo
            const stream = fs.createReadStream(file.path);
            const categories:IImportCategory[] = [];

            // lendo linha por linha 
            const parseFile = csvParse();

            // passando cada pedaço lido para o parseFile
            stream.pipe(parseFile);

            parseFile.on("data", async(line) => {
                // ["name", "description"]
                const [name, description] = line;

                categories.push({
                    name,
                    description
                })
            })
            .on("end", () => {                                  // quando finalizar o parse
                fs.promises.unlink(file.path);
                resolve(categories);
            })
            .on("error", (err) => {
                reject(err);
            })
        });
    };

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);
        
        categories.map(async (category) => {
            const { name, description } = category;

            const existCategory = this.categoriesRepository.findByName(name);

            if (!existCategory) {
                this.categoriesRepository.create({
                    name,
                    description
                })
            }
        })
    }  
}

export { ImportCategoryUseCase };