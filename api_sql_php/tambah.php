<?php
require 'koneksi.php';
$input = file_get_contents('php://input');
$data = json_decode($input,true);
//terima data dari mobile
$nama=trim($data['nama']);
$jurusan=trim($data['jurusan']);
http_response_code(201);
if($nama!='' and $jurusan!=''){
 $query = mysqli_query($koneksi,"insert into mahasiswa(nama,jurusan) values('$nama','$jurusan')");
 $pesan = true;
}else{
 $pesan = false;
}
echo json_encode($pesan);
echo mysqli_error($koneksi);