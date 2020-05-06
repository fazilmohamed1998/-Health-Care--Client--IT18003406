/** IT18003406
 * M. F. Mohamed
*/


$(document).ready(function() {
	if ($("#alertSuccess").text().trim() == "") {
		$("#alertSuccess").hide();
	}
	$("#alertError").hide();
});

// SAVE ==================================================================
$(document).on("click", "#btnSave", function(event) {
	debugger;
	// Clear alerts---------------------
	$("#alertSuccess").text("");
	$("#alertSuccess").hide();
	$("#alertError").text("");
	$("#alertError").hide();

	// Form validation-------------------
	var status = validatePaymentForm();
	if (status != true) {
		$("#alertError").text(status);
		$("#alertError").show();
		return;
	}
	// If valid-------------------------
	var type = ($("hidPaymentSave").val() == "") ? "POST" : "PUT";

	$.ajax({
		url : "PaymentAPI",
		type : type,
		data : $("#formPayment").serialize(),
		datatype : "text",
		complete : function(response, status) {
			onPaymentSaveComplete(response.reponseText, status);
		}
	});
});

function onPaymentSaveComplete(response, status) {
	debugger;
	var resultSet = JSON.parse(response);
	alert("Response Status" + resultSet.status);
	if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully saved.");
			$("#alertSuccess").show();

			$("#divPaymentGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		
	} else if (status == "error") {
		$("#alertError").txt("Error while saving.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while saving.. ");
		$("alertError").show();
	}
	$("hidPaymentIDSave").val("");
	$("formPayment")[0].reset();

}

// REMOVE =================================================================
$(document).on("click", ".btnRemove", function(event) {
	$.ajax({
		url : "PaymentAPI",
		type : "DELETE",
		data : "paymentID=" + $(this).data("paymentid"),
		dataType : "text",
		complete : function(response, status) {
			onPaymentDeleteComplete(response.responseText, status);
		}
	});
});

function onPaymentDeleteComplete(response, status) {
	if (status == "success") {
		var resultSet = JSON.parse(response);
		if (resultSet.status.trim() == "success") {
			$("#alertSuccess").text("Successfully deleted.");
			$("#alertSuccess").show();
			
			$("#divPaymentsGrid").html(resultSet.data);
		} else if (resultSet.status.trim() == "error") {
			$("#alertError").text(resultSet.data);
			$("#alertError").show();
		}
	} else if (status == "error") {
		$("#alertError").text("Error while deleting.");
		$("#alertError").show();
	} else {
		$("#alertError").text("Unknown error while deleting..");
		$("#alertError").show();
	}
}

// UPDATE================================================================
$(document).on(
		"click",
		".btnUpdate",
		function(event) {
			$("#hidPaymentIDSave").val(
					$(this).closest("tr").find('#hidPaymentIDUpdate').val());
			$("#paymentReference").val(
					$(this).closest("tr").find('td:eq(0)').text());
			$("#paymentDate")
					.val($(this).closest("tr").find('td:eq(1)').text());
			$("#paymentMethod").val(
					$(this).closest("tr").find('td:eq(2)').text());
			$("#paymentAmount").val(
					$(this).closest("tr").find('td:eq(3)').text());
		});

// CLIENT-MODEL==========================================================
function validatePaymentForm() {
	// Payment ID
	if ($("#paymentID").val().trim() == "") {
		return "Insert Payment ID.";
	}
	// Payment Date
	if ($("#paymentDate").val().trim() == "") {
		return "Insert Payment Date.";
	}
	// Reference
	if ($("#paymentReference").val().trim() == "") {
		return "Insert Payment Reference.";
	}
	// Amount-------------------------------
	if ($("#paymentAmount").val().trim() == "") {
		return "Insert Payment Amount.";
	}
	// is numerical value
	var tmpAmount = $("#paymentAmount").val().trim();
	if (!$.isNumeric(tmpAmount)) {
		return "Insert a numerical value for Payment.";
	}
	// convert to decimal price
	$("#paymentAmount").val(parseFloat(tmpAmount).toFixed(2));

	// Method------------------------
	if ($("#paymentMethod").val().trim() == "") {
		return "Insert Payment Method.";
	}
	return true;
}
