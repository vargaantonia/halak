using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HalakBackend.Models;
using System;
using MySql.Data.MySqlClient;
using Microsoft.EntityFrameworkCore;
using HalakBackend.DTOs;

namespace HalakBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Halak : ControllerBase
    {
        private readonly HalakContext _context;

        public Halak(HalakContext context)
        {
            _context = context;
        }

        [HttpGet("(halak/to)")]
        public async Task<ActionResult<IEnumerable<Models.Halak>>> GetHalakToNevvelAsync()
        {
            try
            {
                var result = await (from h in _context.Halaks
                                    join t in _context.Tavaks on h.ToId equals t.Id
                                    select new
                                    {
                                        HalNev = h.Nev,
                                        ToNev = t.Nev
                                    }).ToListAsync();

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("fogasok")]
        public async Task<IActionResult> GetFogasok()
        {
            try
            {
                var fogasok = await (from f in _context.Fogasoks
                                     join h in _context.Halaks on f.HalId equals h.Id
                                     join hg in _context.Horgaszoks on f.HorgaszId equals hg.Id
                                     select new
                                     {
                                         HorgaszNev = hg.Nev,
                                         HalNev = h.Nev,
                                         HalFaj = h.Faj,
                                         Datum = f.Datum
                                     }).ToListAsync();

                return Ok(fogasok);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("3legnagyobbHal")]
        public async Task<ActionResult<IEnumerable<dynamic>>> GetTop3LargestFishAsync()
        {
            using (var cx = new HalakContext())
            {
                try
                {
                    var result = await cx.Halaks
                        .Where(h => h.MeretCm.HasValue)
                        .OrderByDescending(h => h.MeretCm)
                        .Take(3)
                        .Select(h => new
                        {
                            HalNev = h.Nev,
                            MeretCm = h.MeretCm
                        })
                        .ToListAsync();

                    return Ok(result);
                }
                catch (Exception ex)
                {
                    return BadRequest(ex.Message);
                }
            }
        }
    }
}
