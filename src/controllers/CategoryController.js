const SourceConfig = require('./../config/podcast-source-config.json');
const { categories } = require('./../config/categories');

exports.read = async (req, res, next) => {
	try {
		let programCategories = [];
		categories.forEach(category=>{
			let programs =  [];
			SourceConfig.forEach(source=>{
				const myPages = source.pages.filter(x=>x.category==category);
				const myPrograms = myPages.map(x=>{return{
					programName: x.program,
					category: x.category,
					sourceName: source.sourceName,
					profileImageURL: process.env.SERVER_BASE_URL + source.profileImageURL
				}})
				programs = programs.concat(myPrograms)
			})
			programCategories.push({
				category,
				programs
			})
		})
		return res.status(200).send({programs: programCategories})
	} catch (err) {
		next(err)
	}
}
