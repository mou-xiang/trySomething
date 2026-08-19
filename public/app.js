//显示访问次数
fetch("/api/visits")
	.then(r => r.json())
	.then(d => {
		document.getElementById("visits").textContent = d.visits;
	}
);

//加载留言
function loadMessages() {
	fetch("/api/messages")
		.then(r => r.json())
		.then(d => {
			const list = document.getElementById("messages");
			list.innerHTML = "";
			d.messages.forEach(m => {
				const li = document.createElement("li");
				li.textContent = m.name + ": " + m.message;
				list.appendChild(li);
			});
		});
}

loadMessages();

//表单提交
document.getElementById("guestbook-form").addEventListener("submit", e => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const message = document.getElementById("message").value;
	fetch("/api/messages", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
	    body: JSON.stringify({ name: name, message: message })
	}).then(r => r.json()).then(() => {
		loadMessages();
		e.target.reset();
	});
});