import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { ToastController,ModalController,AlertController } from '@ionic/angular';
import { HttpXhrBackend } from '@angular/common/http';

@Component({
  selector: 'app-mahasiswa',
  templateUrl: './mahasiswa.page.html',
  styleUrls: ['./mahasiswa.page.scss'],
})
export class MahasiswaPage implements OnInit {
 
  constructor(
    public _apiService: ApiService,
    private modal:ModalController,
    private toastController: ToastController,
    private alertController: AlertController,
  ) {
  }

  ngOnInit() {
    this.getMahasiswa()
  }
  
  async Toast(message: any) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'top',
    });

    await toast.present();
  }

  async AlertHapus(id:any, nama:any, jurusan:any) {
    const alert = await this.alertController.create({
      header: 'Hapus Data',
      message: 'Yakin hapus mahasiswa bernama ' + nama + ' dengan jurusan ' + jurusan + ' ?',
      buttons: [
        {
          text: 'Batal',
          cssClass: 'alert-button-batal',
        },
        {
          text: 'Hapus',
          cssClass: 'alert-button-hapus',
          handler: () => {
            this.hapusMahasiswa(id);
            this.Toast('Data Berhasil di Hapus');
          },
        },
      ],
    });

    await alert.present();
  }

  
  getMahasiswa(){
    this._apiService.tampil('tampil.php').subscribe({
      next: (res:any) => {
        console.log('sukses',res);
        this.dataMahasiswa = res;
      },
      error:(err:any)=>{
        console.log(err);
      }
    })
  }

  reset_model() {
    this.id = null;
    this.nama = '';
    this.jurusan = '';
    }
    open_modal_tambah(isOpen: boolean) {
      this.modal_tambah = isOpen;
      this.reset_model();
      this.modal_tambah = true;
      this.modal_edit = false;
      }
    open_modal_edit(isOpen: boolean, idget: any) {
      this.modal_edit = isOpen;
      this.id = idget;
      console.log(this.id);
      this.ambilMahasiswa(this.id);
      this.modal_tambah = false;
      this.modal_edit = true;
    }
    open_alert_hapus(isOpen:boolean, idget:any){
      this.alert_hapus=isOpen;
      this.id=idget;

    }
    cancel() {
    this.modal.dismiss();
    this.modal_tambah = false;
    this.reset_model();
    }
    tambahMahasiswa() {
      if (this.nama != '' && this.jurusan != '') {
      let data = {
      nama: this.nama,
      jurusan: this.jurusan,
      }
      this._apiService.tambah(data, 'tambah.php')
      .subscribe({
      next: (hasil: any) => {
      this.reset_model();
      console.log('berhasil tambah mahasiswa');
      this.getMahasiswa();
      this.modal_tambah = false;
      this.modal.dismiss();
      },
      error: (err: any) => {
      console.log('gagal tambah mahasiswa');
      }
      })
      } else {
      console.log('gagal tambah mahasiswa karena masih ada data yg kosong');
      }
      }
      hapusMahasiswa(id: any) {
        this._apiService.hapus(id, 
        'hapus.php?id=').subscribe({
        next: (res: any) => {
        console.log('sukses', res);
        this.getMahasiswa();
        console.log('berhasil hapus data');
        },
        error: (error: any) => {
        console.log('gagal');
        }
        })
        }
        ambilMahasiswa(id: any) {
          this._apiService.lihat(id, 
          '/lihat.php?id=').subscribe({
          next: (hasil: any) => {
          console.log('sukses', hasil);
          let mahasiswa = hasil;
          this.id = mahasiswa.id;
          this.nama = mahasiswa.nama;
          this.jurusan = mahasiswa.jurusan;
          },
          error: (error: any) => {
          console.log('gagal ambil data');
          }
          })
          }
            
          editMahasiswa() {
            let data = {
            id: this.id,
            nama: this.nama,
            jurusan: this.jurusan
            }
            this._apiService.edit(data, 'edit.php')
            .subscribe({
            next: (hasil: any) => {
            console.log(hasil);
            this.reset_model();
            this.getMahasiswa();
            console.log('berhasil edit Mahasiswa');
            this.modal_edit = false;
            this.modal.dismiss();
            },
            error: (err: any) => {
            console.log('gagal edit Mahasiswa');
            }
            })
            }
            
        
  dataMahasiswa: any = [];
  modal_tambah = false;
  modal_edit = false;
  alert_hapus = false;
  id: any;
  nama: any;
  jurusan: any;
}
