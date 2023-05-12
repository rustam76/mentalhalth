export default aturan = [
    {
      "prasyarat": ["stres", "kelelahan", "rendahDiri", "konsentrasiRendah", "gangguanTidur"],
      "kesimpulan": "Mental Halt Parah"
    },
    {
      "prasyarat": ["skorUjian", "aktivitasSosial"],
      "operator": "<",
      "nilai": 60,
      "kesimpulan": "mentalHalt Sedang"
    },
    {
      "prasyarat": ["perubahanPolahMakan"],
      "kesimpulan": "mentalHalt Sedang"
    },
    {
      "prasyarat": ["perubahanPolahMinum", "merokok"],
      "kesimpulan": "mentalHalt Sedang"
    },
    {
      "prasyarat": ["konsumsiKafein", "merasaTidakTeratur", "kesulitanMengambilKeputusan"],
      "kesimpulan": "mentalHalt Parah"
    }
  ]
