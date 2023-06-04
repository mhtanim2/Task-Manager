const ListService= async (Request,DataModel,SearchArray) => {
    try{
        let status=Request.params.status;
        let pageNo = Number(Request.params.pageNo);
        let perPage = Number(Request.params.perPage);
        let searchValue = Request.params.searchKeyword;
        let email=Request.headers['email'];

        let skipRow = (pageNo - 1) * perPage;

        let data;

        if (searchValue!=="0") {
            let SearchQuery = {$or:SearchArray}
            data = await DataModel.aggregate([
                    {$match: {email:email,status:status}},
                    {$match: SearchQuery},
                    {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])
        }
        else {
            data = await DataModel.aggregate([
                {$match: {email:email,status:status}},
                {
                    $facet:{
                        Total:[{$count: "count"}],
                        Rows:[{$skip: skipRow}, {$limit: perPage}],
                    }
                }
            ])

        }
        return {status: "success", data: data}
    }
    catch (error) {
        debugger;
        return {status: "fail", data: error}
    }
}
module.exports=ListService