//IT18003406 
//M. F. MOHAMED

<%@page import="model.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payment Management</title>
<link rel="stylesheet"
	href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
	integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
	crossorigin="anonymous">
<script src="Components/Payment.js"></script>
<script src="Components/jquery-3.2.1.min.js"></script>
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>

<body>

	<div class="container">
		<div class="row">
			<div class="col-6">

				<h1>Payment Management</h1>

				<form id="formPayment" name="formPayment" method="post"
					action="Payment.jsp">
					<br> Payment Reference: <input id="paymentReference"
						name="paymentReference" type="text"
						class="form-control form-control-sm"> <br> Payment
					Method: <input id="paymentMethod" name="paymentMethod" type="text"
						class="form-control form-control-sm"> <br> Payment
					Date: <input id="paymentDate" name="paymentDate" type="date"
						class="form-control form-control-sm"> <br> <input
						id="btnSave" name="btnSave" type="button" value="Save"
						class="btn btn-primary"> <input type="hidden"
						id="hidPaymentIDSave" name="hidPaymentIDSave" value="">
				</form>

				<div id="alertSuccess" class="alert alert-success">
					<div id="alertError" class="alert alert-danger"></div>

					<br>
					<div id="divPaymentGrid">
						<%
							Payment paymentObj = new Payment();
							out.println(paymentObj.viewPayments());
						%>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
