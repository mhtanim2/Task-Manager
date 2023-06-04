import React, { Fragment, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { AiOutlineEdit } from "react-icons/ai";
import { AiOutlineCalendar, AiOutlineDelete } from "react-icons/all";
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";
import { GetTaskList } from "../../APIRequest/APIRequest";
import { DeleteToDO } from "../../helper/DeleteAlert";
import { UpdateToDO } from "../../helper/UpdateAlert";

const Canceled = () => {

  let [searchKey, setSearchKey] = useState("0");
  let [perPageKey, setPerPageKey] = useState(5);

  useEffect(() => {
    GetTaskList("Canceled", 1, perPageKey, searchKey);
  }, []);

  const CanceledList = useSelector((state) => state.task.Canceled);

  const Total = useSelector((state) => state.task.Total);

  const DeleteItem = (id) => {
    DeleteToDO(id).then((result) => {
      if (result === true) {
        //TaskListByStatus("Canceled");
        GetTaskList("Canceled", 1, perPageKey, searchKey);
      }
    });
  };

  const StatusChangeItem = (id, status) => {
    UpdateToDO(id, status).then((result) => {
      if (result === true) {
        //TaskListByStatus("Canceled");
        GetTaskList("Canceled", 1, perPageKey, searchKey);
      }
    });
  };
  const handlePageClick = (event) => {
    GetTaskList("Canceled", event.selected + 1, perPageKey, searchKey);
  };

  const PageKeyOnChange = (e) => {
    setPerPageKey(parseInt(e.target.value));
    GetTaskList("Canceled", 1, e.target.value, searchKey);
  };

  const searchData = () => {
    GetTaskList("Canceled", 1, perPageKey, searchKey);
  };

  const searchOnChange = (e) => {
    setSearchKey(e.target.value);
    if (e.target.value.length === 0) {
      setSearchKey("0");
      GetTaskList("Canceled", 1, perPageKey, "0");
    }
  };

  return (
    <Fragment>
      <Container fluid={true} className="content-body">
        <div className="row">
          <div className="col-6">
            <h5>Canceled Task</h5>
          </div>
          <div className="col-2">
            <select
              onChange={PageKeyOnChange}
              className="form-control mx-2 form-select-sm form-select form-control-sm"
            >
              <option value="5">5 Per Page</option>
              <option value="10">10 Per Page</option>
              <option value="20">20 Per Page</option>
              <option value="30">30 Per Page</option>
              <option value="50">50 Per Page</option>
              <option value="100">100 Per Page</option>
              <option value="200">200 Per Page</option>
              <option value="200">200 Per Page</option>
            </select>
          </div>
          <div className="col-4">
            <div className="input-group mb-3">
              <input
                onChange={searchOnChange}
                type="text"
                className="form-control form-control-sm"
                placeholder="Search.."
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
              />
              <button
                onClick={searchData}
                className="btn  btn-outline-primary btn-sm mb-0"
                type="button"
              >
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="row p-0 m-0">
          {CanceledList.map((item, i) => (
            <div
              key={i.toString()}
              className="col-12 col-lg-4 col-sm-6 col-md-4  p-2"
            >
              <div className="card h-100">
                <div className="card-body">
                  <h6 className="animated fadeInUp">{item.title}</h6>
                  <p className="animated fadeInUp">{item.description}</p>
                  <p className="m-0 animated fadeInUp p-0">
                    <AiOutlineCalendar /> {item.createdDate}
                    <a
                      onClick={StatusChangeItem.bind(
                        this,
                        item._id,
                        item.status
                      )}
                      className="icon-nav text-primary mx-1"
                    >
                      <AiOutlineEdit />
                    </a>
                    <a
                      /* onClick={DeleteItem.bind(this, item._id)} */
                      onClick={() => {
                        DeleteItem(item._id);
                      }}
                      className="icon-nav text-danger mx-1"
                    >
                      <AiOutlineDelete />
                    </a>
                    <a className="badge float-end bg-info">{item.status}</a>
                  </p>
                </div>
              </div>
            </div>
          ))}

          <div className="col-12 mt-5">
            <nav aria-label="Page navigation example">
              <ReactPaginate
                previousLabel="<"
                nextLabel=">"
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                pageCount={Total / perPageKey}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName="pagination"
                activeClassName="active"
              />
            </nav>
          </div>
        </div>
      </Container>
    </Fragment>
  );
 
};

export default Canceled;
