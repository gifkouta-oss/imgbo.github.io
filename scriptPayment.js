 // -------------------- SCRIPT DARI KAMU --------------------
    let countdownInterval;
    
    function pilihMetode(bank, rekening, nama, qrisSrc) {
      const qrisArea = document.getElementById("qrisArea");
      const rekeningArea = document.getElementById("rekeningArea");
      const qrisImage = document.getElementById("qrisImage");
      
      if (bank === "QRIS") {
        qrisArea.style.display = "block";
        rekeningArea.style.display = "none";
        qrisImage.src = qrisSrc;
      } else {
        qrisArea.style.display = "none";
        rekeningArea.style.display = "block";
        document.getElementById("nomorRek").textContent = rekening;
        document.getElementById("atasNama").textContent = nama;
      }
      
      document.getElementById("popupModal").style.display = "block";
      mulaiCountdown(300); // 5 menit
    }
    
    function tutupModal() {
      document.getElementById("popupModal").style.display = "none";
      document.getElementById("statusNotif").textContent = "";
      clearInterval(countdownInterval);
      document.getElementById("previewImg").style.display = "none";
      document.getElementById("buktiTransfer").value = "";
    }
    
    function dia(pesan) {
      alert(pesan);
    }

    function salinRekening() {
      const nomor = document.getElementById("nomorRek").textContent;
      navigator.clipboard.writeText(nomor).then(() => {
        dia("Nomor rekening disalin!");
      });
    }
    
    function previewGambar() {
      const file = document.getElementById("buktiTransfer").files[0];
      const preview = document.getElementById("previewImg");
      if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
          preview.src = e.target.result;
          preview.style.display = "block";
        };
        reader.readAsDataURL(file);
      }
    }
    
    async function kirimBukti() {
      const file = document.getElementById("buktiTransfer").files[0];
      const notif = document.getElementById("statusNotif");
      
      if (!file) {
        notif.textContent = "⚠️ Upload bukti transfer terlebih dahulu.";
        return;
      }
      
      notif.textContent = "⏳ Sedang mengirim data...";
      
      const botToken = "7822450556:AAEnttGW7EbGx7nFUApxDiHXNzxOe-0hRm4";
      const chatId = "6317664726";
      const idTopup = document.getElementById("idTopup").textContent;
      const username = document.getElementById("username").textContent;
      const userId = document.getElementById("userId").textContent;
      const jumlah = document.getElementById("jumlah").textContent;
      
      const formData = new FormData();
      formData.append("chat_id", chatId);
      formData.append("caption", `✅ Bukti Topup\nID: ${idTopup}\nUser: ${username} (${userId})\nJumlah: Rp${jumlah}`);
      formData.append("photo", file);
      
      try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: "POST",
          body: formData
        });
        
        const result = await response.json();
        if (result.ok) {
          notif.textContent = "✅ Bukti berhasil dikirim ke admin.";
        } else {
          notif.textContent = "❌ Gagal mengirim. Periksa token bot atau chat ID.";
        }
      } catch (error) {
        notif.textContent = "❌ Gagal mengirim. Koneksi lemah atau error.";
      }
    }
    
    function mulaiCountdown(detik) {
      clearInterval(countdownInterval);
      const timer = document.getElementById("countdown");
      
      function updateTimer() {
        const menit = Math.floor(detik / 60);
        const sisaDetik = detik % 60;
        timer.textContent = `Waktu Tersisa: ${String(menit).padStart(2, '0')}:${String(sisaDetik).padStart(2, '0')}`;
        
        if (detik <= 0) {
          clearInterval(countdownInterval);
          timer.textContent = "⏰ Waktu habis!";
        }
        
        detik--;
      }
      
      updateTimer();
      countdownInterval = setInterval(updateTimer, 1000);
    }
    
    // Klik luar modal = tutup
    window.onclick = function(e) {
      const modal = document.getElementById("popupModal");
      if (e.target === modal) tutupModal();
          }
