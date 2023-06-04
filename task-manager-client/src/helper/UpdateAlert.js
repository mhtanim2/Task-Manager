import Swal from "sweetalert2";
import { UpdateStatusRequest } from "../APIRequest/APIRequest";

export function UpdateToDO(id, status) {
    return Swal.fire({
        title: 'Change Status',
        input: 'select',
        showCancelButton: true,
        inputOptions: { New: 'New', Progress: 'Progress', Completed: 'Completed', Canceled: 'Canceled' },
        inputValue: status,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'update',
    }).then((result) => {
        return UpdateStatusRequest(id, result.value).then((res) => {
            return res;
        })
    })
}